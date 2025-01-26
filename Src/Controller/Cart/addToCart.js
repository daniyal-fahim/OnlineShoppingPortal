import pool from "../../Config/DataBase/DB_Config.js";

import { getGId } from "../User_Seller/getUserId.js";

export const addToCart = async (pid) => {
    try {
        //const pid = req.params.pid;

        // Validate the input
        if (!pid) {
            return res.status(400).json({ error: "Product ID is required" });
        }

        // Assume getGId() is a function that retrieves the user ID
        const uid = getGId();

        // Insert into the database
        await pool.query("INSERT INTO cart (Product_Id, USER_ID) VALUES ($1, $2)", [pid, uid]);

        // Send success response
        
    } catch (error) {
        // Handle errors
        console.error(error);
    }
};
