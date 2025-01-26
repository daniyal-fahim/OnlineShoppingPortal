import productModel from "../../Config/DataBase/Mongo_Schema.js";

// Generate a random product ID
const getIdNum = () => {
  let Id = 'P-';
  for (let i = 0; i < 4; i++) {
    Id += Math.floor(Math.random() * 10).toString();
  }
  return Id;
};

// Check for duplicate product IDs in MongoDB
const checkDuplicateId = async () => {
  let Id = getIdNum();
  const existing = await productModel.findOne({ pid: Id }); // Use findOne for efficiency
  if (existing) {
    console.log(`Duplicate ID found: ${Id}, generating a new one.`);
    return await checkDuplicateId(); // Recursive call for a new ID
  }
  return Id; // Return unique ID
};

// Controller function to add a product
export const addproduct = async (req, res) => {
  const { name, price, category, image, description, stock, rating } = req.body;

  // Validate input fields
  if (!name || !price || !category || !image || !description || stock === undefined) {
    return res.status(400).json({ error: "All fields are required except rating." });
  }

  try {
    // Generate a unique product ID
    const pid = await checkDuplicateId();

    // Create product data object
    const sampleData = {
      pid, // Unique product ID
      imgSrc: image, // Image URL
      title: name, // Product title
      price: parseFloat(price), // Ensure price is a number
      category, // Product category
      description, // Product description
      rating: parseFloat(rating) || 0, // Default rating to 0 if not provided
      stock: parseInt(stock, 10), // Ensure stock is an integer
      action: "Add to Basket", // Default action text
    };

    // Save product to the database
    const newProduct = new productModel(sampleData);
    await newProduct.save();

    // Send success response
    res.status(201).json({ message: "Product created successfully!" });
  } catch (error) {
    console.error("Error saving product:", error.message);
    res.status(500).json({ error: "An error occurred while saving the product." });
  }
};
