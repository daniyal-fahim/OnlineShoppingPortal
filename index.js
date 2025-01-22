import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import ejsRoutes from "./Src/Routes/EjspagesRoute.js"
import userRoutes from "./Src/Routes/UserRoute.js";  // Import user-related routes
import productRoutes from "./Src/Routes/ProductRoute.js";  // Import product-related routes

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));

// Middleware setup
app.use(cors({
    origin: "http://127.0.0.1:3000" || "http://localhost:3000",  // Allow your frontend to make requests
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // Allow cookies to be sent with requests
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set EJS as the template engine
app.set("view engine", "ejs");

// Use the routes for EJS pages
app.use("/", ejsRoutes);

// Use the user-related routes
app.use("/", userRoutes);

// Use the product-related routes
app.use("/", productRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
