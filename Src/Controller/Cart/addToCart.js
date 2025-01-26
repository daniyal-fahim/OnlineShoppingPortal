import pool from "../../Config/DataBase/DB_Config.js";
import { getGId } from "../User_Seller/getUserId.js";

export const addToCart = async (pid) => {
    try {
        // Validate the input
        if (!pid) {
            throw new Error("Product ID is required");
        }

        // Log the incoming product ID for debugging
        console.log('Adding product to cart, Product ID:', pid);

        // Retrieve the user ID using the getGId function (ensure it's async if needed)
        const uid = getGId();
        console.log(uid);
        if (!uid) {
            throw new Error("User ID not found");
        }

        // Insert the product and user ID into the cart table
        const query = "INSERT INTO cart (Product_Id, USER_ID) VALUES ($1, $2)";
        const values = [pid, uid];
        await pool.query(query, values);
        console.log('Adding product to cart, Product ID:', pid);

        // Return a success message
        return { message: "Product added to cart successfully!" };
    } catch (error) {
        // Log the error for debugging
        console.error('Error adding product to cart:', error);
        
        // Return an error message
        return { error: "Failed to add product to cart, please try again later" };
    }
};
