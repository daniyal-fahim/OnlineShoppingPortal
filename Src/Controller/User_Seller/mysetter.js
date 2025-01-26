import { setGId } from "./getUserId.js";
import { jwt } from "../../Config/JWT_Authentication/JWT_Config.js";
import { secret } from "../../Config/JWT_Authentication/JWT_Config.js";

export const mysetter = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        // If a token is present, verify it
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log("Invalid token, but proceeding without setting user ID.");
                // Optionally clear the cookie if you want to handle invalid tokens
                res.clearCookie("token");
            } else {
                // If the token is valid, set the user ID
                console.log('Token Verified:', user);
                req.user = user; // Attach user info to the request
                console.log(`Authenticated as: ${user.data.user_id}`);
                setGId(user.data.user_id); // Set the GID
            }
        });
    } else {
        console.log("No token provided, proceeding without setting user ID.");
    }

    // Call next middleware regardless of token validity
    next();
};