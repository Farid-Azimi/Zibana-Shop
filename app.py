# app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import load_model

# Load your trained model and encoders
model = load_model('recommendation_model.h5')  # Update with your model path
user_encoder = LabelEncoder()
product_encoder = LabelEncoder()

# Load your DataFrame (df) containing product information
df = pd.read_csv('data.csv')  # Update with your data path

user_encoder.fit(df['user_id'])
product_encoder.fit(df['product_id'])

# Initialize FastAPI
app = FastAPI()

# Define a request model
class UserRequest(BaseModel):
    user_id: str

# Suggest products function
def suggest_products(user_id, model, product_encoder, n_suggestions=5):
    # Encode the user ID
    user_id_encoded = user_encoder.transform([user_id])[0]
    
    # Create a list of all product IDs
    all_product_ids = df['product_id'].unique()
    product_ids_encoded = product_encoder.transform(all_product_ids)
    
    # Prepare input for the model
    user_input = np.array([user_id_encoded] * len(product_ids_encoded))
    product_input = product_ids_encoded
    
    # Get predictions
    predictions = model.predict([user_input, product_input])
    
    # Get the predicted interaction probabilities for 'like' (class 1)
    like_probabilities = predictions[:, 1]  # Assuming 'like' is the second class
    
    # Create a list of tuples (product_id, probability)
    product_suggestions = list(zip(all_product_ids, like_probabilities))
    
    # Sort by probability and get the top N suggestions
    product_suggestions.sort(key=lambda x: x[1], reverse=True)
    
    # Return the top N product IDs
    suggested_product_ids = [product[0] for product in product_suggestions[:n_suggestions]]
    
    return suggested_product_ids

# Define the API endpoint
@app.post("/suggest-products/")
async def get_product_suggestions(user_request: UserRequest):
    user_id = user_request.user_id
    
    if user_id not in user_encoder.classes_:
        raise HTTPException(status_code=404, detail="User ID not found.")
    
    suggested_products = suggest_products(user_id, model, product_encoder)
    return {"suggested_products": suggested_products}

# Run the application
# Use the command: uvicorn app:app --reload