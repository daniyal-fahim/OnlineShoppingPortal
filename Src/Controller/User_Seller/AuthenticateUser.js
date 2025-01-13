import { setGId } from "./getUserId.js";
import { jwt } from "../../Config/JWT_Authentication/JWT_Config.js";
import { secret } from "../../Config/JWT_Authentication/JWT_Config.js";

// Use cookie-parser
export const authenticateToken = (req, res, next) => {
  // Extract the token from the cookie named 'token'
  const token = req.cookies?.token;

  if (!token) {
    console.log("No Token Received from Cookie, DONOT VERIFY");
    return res.status(401).json({ msg: "Please login first" });
  }

  // Verify the token
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      res.clearCookie("token"); // Clear the invalid token
      console.log("Token Verification Failed, DONOT VERIFY");
      return res.status(500).json({ msg: "Please login first" });
    }

    console.log('Token Verified:', user);
    req.user = user;
    console.log(`AUTHENTICATED: Done his work by adding the email ${user.data.user_id}`);
    setGId(user.data.user_id);
    next();
  });
};
