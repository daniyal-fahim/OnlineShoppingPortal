import mongoose from "mongoose";

// Define Product Schema
const productSchema = new mongoose.Schema({
    sao: {
        type: String, 
        required: true
    }
});

// Create Product Model
const productModel = mongoose.model('Products', productSchema, 'Product');

// Export Product Model
export default productModel;
