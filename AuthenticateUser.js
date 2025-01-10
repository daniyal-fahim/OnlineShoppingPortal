
import { setGId } from "./getUserId.js";
import { jwt } from "../../config/auth.js";
import { secret } from "../../config/auth.js";

export const authenticateToken = (req, res, next)=> {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      console.log("DONOT VERIFY")
      // return res.redirect('/login'); 
    }
  
    jwt.verify(token, secret, (err, user) => { // Use the same secret here
      if (err) {
        res.clearCookie("token"); // Clear the invalid token
        console.log("DONOT VERIFY")
        return res.status(500).json({ msg: "please login first" });
      }
      console.log('Token Verified:', user);
  
      req.user = user; 
console.log(` AUTHENTICATED AS DoNE HIS WORK BY ADDING THE EMAIL ${user.data.user_id}`);
     setGId(user.data.user_id);
      next(); 
    });
  };