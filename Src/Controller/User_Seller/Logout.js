import { setGId } from "./getUserId.js";


export const Logout = (req,res)=>{
    
    setGId("UserLogout");
    res.status(200).json({ message: "User Logout Succesful" });
    
}