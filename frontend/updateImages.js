// const { MongoClient } = require('mongodb');

// const MONGO_URI = "mongodb+srv://elnazi81f:sagepakootahe2@mycluster.w4fnv.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

// async function updateImagePaths() {
//     const client = new MongoClient(MONGO_URI);

//     try {
//         await client.connect();
//         console.log("✅ Connected to MongoDB Atlas");

//         const db = client.db("zibana"); // نام دیتابیس
//         const collection = db.collection("products"); // نام کلکسیون

//         // دریافت تمام محصولات
//         const products = await collection.find({}).toArray();
//         console.log(`📦 تعداد محصولات یافت شده: ${products.length}`);

//         if (products.length === 0) {
//             console.log("⚠️ هیچ محصولی در دیتابیس یافت نشد.");
//             return;ش
//         }

//         // حلقه برای بررسی و تغییر imageSrc بر اساس category
//         for (const product of products) {
//             let newPath = "/assets/images/other/default.jpg"; // مقدار پیش‌فرض

//             if (product.category.includes("مو")) {
//                 newPath = `/assets/images/hair/${product.imageSrc.split('/').pop()}`;
//             } else if (product.category.includes("پوست")) {
//                 newPath = `/assets/images/skin/${product.imageSrc.split('/').pop()}`;
//             } else if (product.category.includes("مراقبت شخصی")) {
//                 newPath = `/assets/images/personal_care/${product.imageSrc.split('/').pop()}`;
//             }

//             await collection.updateOne(
//                 { _id: product._id }, // پیدا کردن محصول بر اساس `_id`
//                 { $set: { imageSrc: newPath } }
//             );

//             console.log(`🔄 تصویر محصول "${product.title}" به‌روز شد: ${newPath}`);
//         }

//         console.log("✅ همه‌ی تصاویر با موفقیت به‌روزرسانی شدند.");

//     } catch (error) {
//         console.error("❌ خطا در به‌روزرسانی تصاویر:", error);
//     } finally {
//         await client.close();
//         console.log("🔌 اتصال به دیتابیس بسته شد.");
//     }
// }

// updateImagePaths();

const { MongoClient } = require('mongodb');

const MONGO_URI = "mongodb+srv://elnazi81f:sagepakootahe2@mycluster.w4fnv.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

async function updateImagePaths() {
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB Atlas");

        const db = client.db("zibana"); // نام دیتابیس
        const collection = db.collection("products"); // نام کلکسیون

        // دریافت تمام محصولات
        const products = await collection.find({}).toArray();
        console.log(`📦 تعداد محصولات یافت شده: ${products.length}`);

        if (products.length === 0) {
            console.log("⚠️ هیچ محصولی در دیتابیس یافت نشد.");
            return;
        }

        // حلقه برای بررسی و تغییر imageSrc بر اساس category
        for (const product of products) {
            let newPath = product.imageSrc; // مقدار پیش‌فرض حفظ شود

            if (product.category[0] === "ناخن") {
                newPath = "/images/products/nail/";

                if (product.category[1] === "تجهیزات و ابزار های ناخن") {
                    const toolsImages = ["1.jpg", "11.jpg"];
                    newPath += toolsImages[Math.floor(Math.random() * toolsImages.length)];
                } else if (product.category[1] === "مراقبت ناخن") {
                    const careImages = ["2.jpg", "22.jpg"];
                    newPath += careImages[Math.floor(Math.random() * careImages.length)];
                }
            }

            // آپدیت محصول در دیتابیس
            await collection.updateOne(
                { _id: product._id }, // پیدا کردن محصول بر اساس `_id`
                { $set: { imageSrc: newPath } }
            );

            console.log(`🔄 تصویر محصول "${product.title}" به‌روز شد: ${newPath}`);
        }

        console.log("✅ همه‌ی تصاویر با موفقیت به‌روزرسانی شدند.");

    } catch (error) {
        console.error("❌ خطا در به‌روزرسانی تصاویر:", error);
    } finally {
        await client.close();
        console.log("🔌 اتصال به دیتابیس بسته شد.");
    }
}

updateImagePaths();

