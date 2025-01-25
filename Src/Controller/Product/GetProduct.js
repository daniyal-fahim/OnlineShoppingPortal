import productModel from "../../Config/DataBase/Mongo_Schema.js";

export const getProduct = async ()=>{
    try {
        const products = await productModel.find({}); // Fetch all products
        return(products); // Send the results as JSON
        
    } catch (err) {
        console.log('error fetching the products');
    }
}