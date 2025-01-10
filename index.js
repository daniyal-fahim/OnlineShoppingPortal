 import express from "express";
// import bodyparser from "body-parser";


// const app = express();


// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// const port = 5000; 
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// export default app;

const app = express();

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

// Define a route to render the EJS template
app.get('/', (req, res) => {
    res.render('index', { products });
});
app.get('/login', (req, res) => {
    res.render('login', { products });
});
app.get('/signup', (req, res) => {
    res.render('signup', { products });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
