import pool from "../../Config/DataBase/DB_Config.js";
import { getGId } from "../User_Seller/getUserId.js";
import { cartCheckout } from "./DeleteItemInCart.js";
import productModel from "../../Config/DataBase/Mongo_Schema.js"; // Ensure this is imported correctly

export const checkout = async (req, res) => {
    try {
        const uid = getGId();
        console.log("User ID:", uid);

        // Query PostgreSQL to get product IDs and quantities from the cart
        const result = await pool.query(
            "SELECT Product_id FROM cart WHERE user_id = $1",
            [uid]
        );
        console.log("PostgreSQL Result:", result.rows);

        // Extract Product IDs and their quantities
        const cartItems = result.rows;
        if (cartItems.length === 0) {
            return res.status(200).json({ message: "Cart is empty", total: 0, products: [] });
        }

        const productIds = cartItems.map(item => item.product_id);

        // Query MongoDB to get product details for the Product IDs
        const products = await productModel.find({ pid: { $in: productIds } });
        console.log("Products from MongoDB:", products);

        let totalPrice = 0;

        // Decrement stock and calculate total price
        for (const product of products) {
            const cartItem = cartItems.find(item => item.product_id === product.pid);
            if (cartItem) {
                
                if (product.stock < 1) {
                    return res
                        .status(400)
                        .json({ message: `Insufficient stock for product ${product.name}` });
                }
                totalPrice += product.price * 1;

                // Decrement product stock
                await productModel.updateOne(
                    { pid: product.pid },
                    { $inc: { stock: -1} }
                );
            }
        }

        // Delete all items from the cart after checkout
        cartCheckout();

        return res.status(200).json({
            message: "Checkout successful",
            total: totalPrice,
            products: products.map(product => ({
                pid: product.pid,
                name: product.name,
                price: product.price,
            })),
        });
    } catch (error) {
        console.error("Error during checkout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
