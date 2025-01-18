// Import required modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { register } from "./Src/Controller/User_Seller/RegisterUser.js";
import { login } from "./Src/Controller/User_Seller/LoginUser.js";
import { EmailSender } from "./Src/Controller/OTP/EmailSender.js";
import { authenticateToken } from "./Src/Controller/User_Seller/AuthenticateUser.js";
import { CheckOTP } from "./Src/Controller/OTP/CheckOTP.js";
import { getGId } from "./Src/Controller/User_Seller/getUserId.js";
import path from "path";


const app = express();
const PORT = 3000;



// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));

// Middleware
// Enable CORS for cross-origin requests
app.use(cors({
    origin: "http://127.0.0.1:3000"|| "http://localhost:3000", // Use your backend URL as the origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent with requests
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Parse incoming requests with JSON and URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set EJS as the template engine
app.set("view engine", "ejs");

// Sample product data
// const products = [
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 1", price: "$5", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 2", price: "$10", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 3", price: "$15", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 4", price: "$20", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 5", price: "$25", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 6", price: "$30", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 7", price: "$35", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 8", price: "$40", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 9", price: "$45", action: "Add to Basket" },
//     { imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 10", price: "$50", action: "Add to Basket" },
// ];
const products = [
    {
        imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
        title: "Product 1",
        price: "$5",
        category: "Electronics",
        description: "This is a high-quality electronic gadget with cutting-edge features.",
        rating: 4.5,
        stock: 15,
        action: "Add to Basket"
    },
    {
       // imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
        title: "Product 2",
        price: "$10",
        category: "Home Appliances",
        description: "An essential appliance for modern homes. Compact and efficient.",
        rating: 4.0,
        stock: 25,
        action: "Add to Basket"
    },
    {
        imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
        title: "Product 3",
        price: "$15",
        category: "Kitchenware",
        description: "A durable and stylish kitchen product for daily use.",
        rating: 3.8,
        stock: 10,
        action: "Add to Basket"
    },
    {
        imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
        title: "Product 4",
        price: "$20",
        category: "Fashion",
        description: "Trendy and comfortable clothing for every occasion.",
        rating: 4.7,
        stock: 30,
        action: "Add to Basket"
    },
    {
        imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
        title: "Product 5",
        price: "$25",
        category: "Sports",
        description: "A perfect sports accessory for outdoor enthusiasts.",
        rating: 4.2,
        stock: 20,
        action: "Add to Basket"
    },
    {
        imgSrc: "/images/1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg",
        title: "Product 6",
        price: "$30",
        category: "Books",
        description: "A bestseller novel with an engaging storyline and vivid characters.",
        rating: 4.9,
        stock: 5,
        action: "Add to Basket"
    }
    // Add more products as needed
];

// Routes
// Home route to render the products page
app.get("/", (req, res) => {
    res.render("index", { products });
});
app.get("/detail", (req, res) => {
    res.render("ProductDetail", { products });
});
// Render login and signup pages
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/Head", (req, res) => {
    res.render("Header1");
});
// User registration route
app.post("/register", (req, res) => {
    console.log(req.body); // Debug log
    register(req, res);
});

// User login route
app.post("/log", (req, res) => {
    console.log(req.body); // Debug log
    login(req, res);
});

// Middleware to authenticate requests
//app.use(authenticateToken);

// Email sending route
app.post("/send-email", (req, res) => {
    console.log("Cookies received:", req.cookies);

    EmailSender(req, res);
});

import { Islogin } from "./Src/Controller/User_Seller/IsLogin.js";
app.post("/islogin", (req, res) => {
    console.log("Cookies received:", req.cookies);

    Islogin(req, res);
});

// Product detail route
app.get("/product/:title", (req, res) => {
    const productTitle = req.params.title;
    const product = products.find(p => p.title === productTitle); // Find product by title
    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.render("ProductDetail", { product, products });
});
import { Logout } from "./Src/Controller/User_Seller/Logout.js";
app.post("/logout", (req, res) => {
    Logout(req, res);
    res.render("index");
});
// OTP verification route
app.post("/verify-otp", (req, res) => {
    CheckOTP(req, res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
