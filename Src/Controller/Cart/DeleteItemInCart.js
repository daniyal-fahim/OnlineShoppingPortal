

import pool from "../../Config/DataBase/DB_Config.js";
import { getGId } from "../User_Seller/getUserId.js";

// Function to delete a specific item from the cart
export const deleteItem = async (pid,req, res) => {
    try {
       
        const uid = getGId();

        // Validate input
        if (!pid) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        // Execute the query
        await pool.query("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [uid, pid]);

        // Send success response
        res.status(200).json({ msg: "Item deleted successfully" });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Failed to delete item from cart" });
    }
};

// Function to delete all items from the cart (checkout)
export const cartCheckout = async() => {
    try {
        const uid = getGId();

        // Execute the query
        await pool.query("DELETE FROM cart WHERE user_id = $1", [uid]);

        // Send success response
    } catch (error) {
        // Handle errors
        console.error(error);
  }
};
