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

// Home route to render the products page
router.get("/", async (req, res) => {
    try {
        const products = await getProduct(); // Wait for products to be fetched
        res.render("index", { products }); // Pass products to the view
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
    res.render("ProductDetail", { product, products });
});


// Add product route (can be expanded to save data)
router.post("/addproduct", (req, res) => {
   addproduct(req,res);
    console.log("Product Added:", req.body);
});

export default router;
