import pool from "../../Config/DataBase/DB_Config.js";
import { getGId } from "./getUserId.js";

export const Islogin = async (req, res) => {
    const user_id = getGId();
    if (!user_id||user_id == 'UserLogout') {
        return res.status(400).json({ login: false, message: "Invalid user ID" });
    }
      
        try {
          let temp;
      
          // Determine the correct query based on user ID prefix
          if (user_id.startsWith('U')) {
            // Query for regular users
            temp = await pool.query('SELECT lname, fname, email FROM users WHERE user_id = $1', [user_id]);
          } else {
            // Handle unknown user_id format
            return res.status(400).json({login: false, message: "Invalid user ID format" });
          }
      
          // If the query returns a valid result
          if (temp.rows.length > 0) {
            const user = temp.rows[0];
            const fullName = `${user.fname} ${user.lname}`;
            res.json({
              fullname: fullName,
              email: user.email,
              login: true,
            });
          } else {
            // If no results found
            res.status(404).json({ login: false,message: "User not found" });
          }
      
        } catch (err) {
          console.error("Error:", err.message);
          res.status(500).json({ login: false, message: `Server error: ${err.message}` });
        }
   
};




export const IsloginCheck = async () => {
    const user_id = getGId();
    if (!user_id||user_id == 'UserLogout') {
      console.log("I RETURND FALSE YOU no USER ID");

      return false;    }
      
        try {
          let temp;
      
          // Determine the correct query based on user ID prefix
          if (user_id.startsWith('U')) {
            // Query for regular users
            temp = await pool.query('SELECT lname, fname, email FROM users WHERE user_id = $1', [user_id]);
          } else {
            // Handle unknown user_id format
            console.log("I RETURND FALSE YOU");
            return false;
          }
      
          // If the query returns a valid result
          if (temp.rows.length > 0) {
            const user = temp.rows[0];
            const fullName = `${user.fname} ${user.lname}`;
            console.log("I RETURND True  to YOU");

           return true;
          } else {
            // If no results found
            console.log("I RETURND FALSE YOU");

            return false;          }
      
        } catch (err) {
          console.error("Error:", err.message);
          console.log("I RETURND FALSE YOU");

          return false;        }
   
};