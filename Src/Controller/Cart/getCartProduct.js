import pool from "../../Config/DataBase/DB_Config.js";
import productModel from "../../Config/DataBase/Mongo_Schema.js";
import { getGId } from "../User_Seller/getUserId.js";

export const getCartProduct = async () => {
    try {
        const uid = getGId();
        console.log("User ID:", uid);

        // Query PostgreSQL to get product IDs from the cart
        const result = await pool.query("SELECT Product_id FROM cart WHERE user_id = $1", [uid]);
        console.log("PostgreSQL Result:", result.rows);

        // Extract Product IDs from the result
        const productIds = result.rows.map(row => row.product_id);
        console.log("Product IDs:", productIds);

        // If no products are found in the cart
        if (productIds.length === 0) {
            return []; // Return an empty array if no products in the cart
        }

        // Query MongoDB to get product details for the Product IDs
        const products = await productModel.find({ pid: { $in: productIds } });
        console.log("Products from MongoDB:", products);

        // Return the product details as a response
        return products;
    } catch (error) {
        console.error("Error fetching cart products:", error);
        throw new Error("Failed to fetch cart products");
    }
};


