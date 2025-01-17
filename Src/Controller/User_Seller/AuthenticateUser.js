import { setGId } from "./getUserId.js";
import { jwt } from "../../Config/JWT_Authentication/JWT_Config.js";
import { secret } from "../../Config/JWT_Authentication/JWT_Config.js";

export const authenticateToken = (req, res, next)=> {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.log("No Token DONOT VERIFY")
      // return res.redirect('/login'); 
    }
  
    jwt.verify(token, secret, (err, user) => { // Use the same secret here
      console.log('Token :', token);
      if (err) {
        res.clearCookie("token"); // Clear the invalid token
        console.log("INTRUDER DONOT VERIFY")
        return res.status(500).json({ msg: "please login first" });
      }
      console.log('Token Verified:', user);
  
      req.user = user; 
console.log(` AUTHENTICATED AS DoNE HIS WORK BY ADDING THE EMAIL ${user.data.user_id}`);
     setGId(user.data.user_id);
      next(); 
    });
  };