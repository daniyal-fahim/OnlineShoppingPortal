import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import ejsRoutes from "./Src/Routes/EjspagesRoute.js";
import userRoutes from "./Src/Routes/UserRoute.js"; // Import user-related routes
import productRoutes from "./Src/Routes/ProductRoute.js"; // Import product-related routes
import mongoose from "mongoose";

import dotenv from "dotenv";
import { mysetter } from "./Src/Controller/User_Seller/mysetter.js";

dotenv.config();

mongoose
  .connect(process.env.mongodburi)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));

// Middleware setup
const allowedOrigins = [
  "http://127.0.0.1:3000", // Localhost
  "http://localhost:3000", // Localhost
  "https://online-shopping-portal-kdx66wx0p-daniyal-fahims-projects.vercel.app", // Vercel production
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the origin
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Enable credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions)); // Apply CORS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set the directory for views
app.set("views", path.join(process.cwd(), "Src", "views"));

app.use(mysetter);

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

// Export the app for Vercel
export default app;
