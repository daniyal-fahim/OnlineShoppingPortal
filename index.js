// Import required modules
import express from "express";
import bodyParser from "body-parser";
import { register } from "./Src/Controller/User_Seller/RegisterUser.js";
import { login } from "./Src/Controller/User_Seller/LoginUser.js";
import { EmailSender } from "./Src/Controller/OTP/EmailSender.js";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./Src/Controller/User_Seller/AuthenticateUser.js";
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// Set EJS as the template engine
app.set('view engine', 'ejs');

// Sample product data
const products = [
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 1", price: "$5", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 2", price: "$10", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 3", price: "$15", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 4", price: "$20", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 5", price: "$25", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 6", price: "$30", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 7", price: "$35", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 8", price: "$40", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 9", price: "$45", action: "Add to Basket" },
    { imgSrc: "./1fc4eaad-f8ae-42bf-ab14-7b824573c6c4.jpeg", title: "Product 10", price: "$50", action: "Add to Basket" },
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { products });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/reg', (req, res) => {
    console.log(req.body); // Log the request body to check its content
    register(req, res); // Call the register function
    
});

app.post('/log', (req, res) => {
    console.log(req.body); // Log the request body to check its content
    login(req, res); // Call the register function
    
});
import { getGId } from "./Src/Controller/User_Seller/getUserId.js";
app.use(authenticateToken);

app.post('/send', (req, res) => {
    console.log("SUCCESSFULLY LANDED HERE "+getGId());
    res.status(200).json({ message: "User registered successfully" });

    //EmailSender(req, res); // Call the register function
    
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
