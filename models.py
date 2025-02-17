def build_recommendation_model(n_users, n_products, embedding_dim=50, dense_units=[128, 64], n_classes=2):
    """
    Builds and compiles a recommendation model with user and product embeddings.

    Args:
        n_users (int): Number of unique users.
        n_products (int): Number of unique products.
        embedding_dim (int, optional): Dimension of embedding spaces. Defaults to 50.
        dense_units (list, optional): List containing the number of units for each Dense layer.
        n_classes (int, optional): Number of output classes. Defaults to 2 (e.g., view and like).

    Returns:
        model (tf.keras.Model): Compiled Keras model.
    """
    from tensorflow.keras.layers import Input, Embedding, Flatten, Concatenate, Dense
    from tensorflow.keras.models import Model

    # Define input layers
    user_input = Input(shape=[1], name="user_input")
    product_input = Input(shape=[1], name="product_input")
    
    # Create and flatten embeddings for both user and product
    user_embedding = Embedding(input_dim=n_users + 1, output_dim=embedding_dim, name="user_embedding")(user_input)
    product_embedding = Embedding(input_dim=n_products + 1, output_dim=embedding_dim, name="product_embedding")(product_input)
    user_vector = Flatten(name="flatten_user")(user_embedding)
    product_vector = Flatten(name="flatten_product")(product_embedding)
    
    # Combine the embeddings
    merged_vector = Concatenate(name="concatenate")([user_vector, product_vector])
    
    # Add Dense layers dynamically based on `dense_units`
    x = merged_vector
    for i, units in enumerate(dense_units):
        x = Dense(units, activation='relu', name=f"dense_{i+1}")(x)
    
    # Output layer with softmax activation for classification
    output = Dense(n_classes, activation='softmax', name="output")(x)
    
    # Build and compile the model
    model = Model(inputs=[user_input, product_input], outputs=output, name="recommendation_model")
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    return model

def train_recommendation_model(model, train_user, train_product, train_labels, 
                               validation_split=0.1, epochs=10, batch_size=64):
    """
    Trains the recommendation model on the provided training data.
    
    Args:
        model (tf.keras.Model): The compiled recommendation model.
        train_user (array-like): User input data.
        train_product (array-like): Product input data.
        train_labels (array-like): Target labels.
        validation_split (float, optional): Fraction of training data used for validation.
        epochs (int, optional): Number of epochs for training.
        batch_size (int, optional): Training batch size.
    
    Returns:
        history: Training history object returned by model.fit.
    """
    history = model.fit(
        [train_user, train_product],
        train_labels,
        epochs=epochs,
        batch_size=batch_size,
        validation_split=validation_split,
        verbose=1
    )
    return history
