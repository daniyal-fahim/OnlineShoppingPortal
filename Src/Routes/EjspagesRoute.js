import express from "express";

const router = express.Router();

// Home route to render the products page
// router.get("/", (req, res) => {
//     res.render("index", { products });
// });

// Render product detail page
// router.get("/detail", (req, res) => {
//     res.render("ProductDetail", { products });
// });

// Render login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Render signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Render header page (if you have a separate header)
router.get("/head", (req, res) => {
    const sortBy = req.query.sortBy || "title"; // Default sorting by name
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default sorting o
    res.render("Header",{ sortBy,sortOrder });
});

// Render add product page
router.get("/addproduct", (req, res) => {
    const sortBy = req.query.sortBy || "title"; // Default sorting by name
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default sorting order is ascending
    res.render("AddProduct" ,{ sortBy,sortOrder });
});

// Render product detail for a specific product based on title
// router.get("/product/:title", (req, res) => {
//     const productTitle = req.params.title;
//     const product = products.find(p => p.title === productTitle); // Find product by title
//     if (!product) {
//         return res.status(404).send("Product not found");
//     }
//     res.render("ProductDetail", { product, products });
// });

export default router;
