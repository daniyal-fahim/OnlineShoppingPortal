import productModel from "../../Config/DataBase/Mongo_Schema.js";


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

// Function to generate random data for products
const generateRandomProduct = () => {
  const categories = ['Fashion', 'Electronics', 'Home', 'Beauty', 'Sports'];
  const names = ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'];
  const descriptions = ['Great product', 'Amazing quality', 'Highly recommended', 'Best in the market', 'Top-notch'];
  const ratings = [1, 2, 3, 4, 5];
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    price: (Math.random() * 100).toFixed(2),
    category: categories[Math.floor(Math.random() * categories.length)],
    image: 'https://via.placeholder.com/150', // Example placeholder image
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    stock: Math.floor(Math.random() * 100) + 1, // Random stock between 1 and 100
    rating: ratings[Math.floor(Math.random() * ratings.length)], // Random rating between 1 and 5
  };
};

// Function to add 20 sample products
export const addSampleProducts = async () => {
  try {
    for (let i = 0; i < 20; i++) {
      const productData = generateRandomProduct();

      // Ensure the unique ID is generated and checked
      const pid = await checkDuplicateId(); 

      // Add the product data to the database
      const newProduct = new productModel({
        pid, // Unique product ID
        imgSrc: productData.image, 
        title: productData.name,
        price: parseFloat(productData.price),
        category: productData.category,
        description: productData.description,
        rating: parseFloat(productData.rating),
        stock: parseInt(productData.stock, 10),
        action: "Add to Basket", // Default action
      });

      await newProduct.save(); // Save product to the database
      console.log(`Product ${i + 1} added successfully!`);
    }
    console.log("All 20 sample products added successfully.");
  } catch (error) {
    console.error("Error adding products:", error.message);
  }
};


