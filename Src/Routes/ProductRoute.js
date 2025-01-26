import express from "express";
import { getGId } from "../Controller/User_Seller/getUserId.js";  // Assuming you might need this for user-specific data or authentication
import { addproduct } from "../Controller/Product/AddProduct.js";
const router = express.Router();

// // Sample product data (can be fetched from a database)
// const products = [
//     {
//         imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
//         title: "Product 1",
//         price: "$5",
//         category: "Electronics",
//         description: "This is a high-quality electronic gadget with cutting-edge features.",
//         rating: 4.5,
//         stock: 15,
//         action: "Add to Basket"
//     },
//     {
//        // imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
//         title: "Product 2",
//         price: "$10",
//         category: "Home Appliances",
//         description: "An essential appliance for modern homes. Compact and efficient.",
//         rating: 4.0,
//         stock: 25,
//         action: "Add to Basket"
//     },
//     {
//         imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
//         title: "Product 3",
//         price: "$15",
//         category: "Kitchenware",
//         description: "A durable and stylish kitchen product for daily use.",
//         rating: 3.8,
//         stock: 10,
//         action: "Add to Basket"
//     },
//     {
//         imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
//         title: "Product 4",
//         price: "$20",
//         category: "Fashion",
//         description: "Trendy and comfortable clothing for every occasion.",
//         rating: 4.7,
//         stock: 30,
//         action: "Add to Basket"
//     },
//     {
//         imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
//         title: "Product 5",
//         price: "$25",
//         category: "Sports",
//         description: "A perfect sports accessory for outdoor enthusiasts.",
//         rating: 4.2,
//         stock: 20,
//         action: "Add to Basket"
//     },
//     {
//         imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
//         title: "Product 6",
//         price: "$30",
//         category: "Books",
//         description: "A bestseller novel with an engaging storyline and vivid characters.",
//         rating: 4.9,
//         stock: 5,
//         action: "Add to Basket"
//     }
//     // Add more products as needed
// ];
import { getProduct } from "../Controller/Product/GetProduct.js";
import { getCartProduct } from "../Controller/Cart/getCartProduct.js";


router.get("/cart", async (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const sortBy = req.query.sortBy || 'name';
    const sortOrder = req.query.sortOrder || 'asc';

    try {
        const products = await getCartProduct(); // Wait for products to be fetched
        // Render the cart view
        res.render("cart", { products, sortBy, sortOrder });
    } catch (error) {
        console.error("Error fetching cart products:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Home route to render the products page
router.get("/", async (req, res) => {
    try {
        const products = await getProduct(); // Wait for products to be fetched
        const sortBy = req.query.sortBy || 'name';
        const sortOrder = req.query.sortOrder || 'asc';

        res.render("index", { products, sortBy, sortOrder }); // Pass products to the view
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).send("Failed to load products");
    }
});

// Product detail route for a specific product by ID (recommended over title)
router.get("/product/:title", async (req, res) => {
    const products = await getProduct();
    const productTitle = req.params.title;
    const product = products.find(p => p.title === productTitle); // Find product by title
    if (!product) {
        return res.status(404).send("Product not found");
    }
    const sortBy = req.query.sortBy || "title"; // Default sorting by name
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default sorting order is ascending
    res.render("ProductDetail", { product, products, sortBy, sortOrder });
});


import { deleteItem } from "../Controller/Cart/DeleteItemInCart.js";

router.delete('/cart/remove/:productId', (req, res) => {
    const pid = req.params.productId;
   deleteItem(pid,req,res);
    
});
// Add product route (can be expanded to save data)
router.post("/addproduct", (req, res) => {
    addproduct(req, res);
    console.log("Product Added:", req.body);
});
import { checkout } from "../Controller/Cart/Checkout.js";
router.post("/checkout",(req,res)=>{
    checkout(req,res);
})


router.get("/sort", async (req, res) => {
    try {
        // Get the sorting criteria from query parameters
        const sortBy = req.query.sortBy || "title"; // Default sorting by title (name)
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default sorting order is ascending

        // Fetch products
        let products = await getProduct();

        // Sort products based on the criteria
        products.sort((a, b) => {
            if (sortBy === "title" && typeof a.title === "string" && typeof b.title === "string") {
                // Compare the first letter of titles (case insensitive)
                const firstLetterA = a.title.trim()[0].toLowerCase();
                const firstLetterB = b.title.trim()[0].toLowerCase();

                return firstLetterA.localeCompare(firstLetterB) * sortOrder;
            } else if (typeof a[sortBy] === "number") {
                // Numerical comparison for price or other numeric fields
                return (a[sortBy] - b[sortBy]) * sortOrder;
            }
            return 0; // Default case for unsupported data types
        });

        // Render the view with sorted products
        res.render("index", { products, sortBy, sortOrder });

    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).send("Failed to load products");
    }
});

import { addToCart } from "../Controller/Cart/addToCart.js";



router.get('/addtocart/:pid', async (req, res) => {
    const pid = req.params.pid;
    console.log("ADD TO CART IS CALLED");

    try {
        const result = await addToCart(pid); // Wait for the result from addToCart

        // Handle success
        return res.status(200).json(result); // Return success message from addToCart
    } catch (error) {
        // Handle failure
        console.error('Error in addToCart:', error);
        return res.status(500).json({ error: "Failed to add product to cart" });
    }
});



export default router;