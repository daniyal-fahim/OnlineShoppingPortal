import { setGId } from "./getUserId.js";


export const Logout = (req,res)=>{
    setGId(NULL);
    res.status(200).json({ message: "User Logout Succesful" });
   
}