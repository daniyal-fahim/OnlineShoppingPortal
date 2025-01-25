import mongoose from "mongoose";

// Define Product Schema
const productSchema = new mongoose.Schema({
    pid:{
        type: String,
        required: true,
        unique: true, // Enforce uniqueness
    },
    imgSrc: {
        type: String,
        required: true, // Image URL is mandatory
    },
    title: {
        type: String,
        required: true, // Product title is mandatory
    },
    price: {
        type: Number,
        required: true, // Product price is mandatory
    },
    category: {
        type: String,
        required: true, // Product category is mandatory
    },
    description: {
        type: String,
        required: true, // Description is mandatory
    },
    rating: {
        type: Number,
        min: 0, // Minimum rating is 0
        max: 5, // Maximum rating is 5
        default: 0, // Default rating is 0
    },
    stock: {
        type: Number,
        required: true, // Stock is mandatory
        min: 0, // Stock cannot be negative
    },
    action: {
        type: String,
        default: "Add to Basket", // Default action text
    },
});

// Create Product Model
const productModel = mongoose.model("Product", productSchema);

// Export Product Model
export default productModel;
