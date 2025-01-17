import { secret } from "../../Config/JWT_Authentication/JWT_Config.js";
import { jwt } from "../../Config/JWT_Authentication/JWT_Config.js";
import { bcrypt } from "../../Config/JWT_Authentication/JWT_Config.js";
import { setGId } from "./getUserId.js";
import pool from "../../Config/DataBase/DB_Config.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if the user exists
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      const user_id = user.user_id;
      
      if (match) {
        // Set the user ID globally if needed
        setGId(user_id);

        // Create a JWT token
        const data = {
          user_id,
        };

        const token = jwt.sign(
          {
            data,
          },
          secret,
          { expiresIn: "1h" }
        );

        // Set the cookie and send response only once
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,  // Ensure this is set to true only in production (for HTTPS)
          sameSite: 'None',
          maxAge: 3600000, // 1 hour expiration
          path: "/",
        });

        console.log("Authentication successful");
        console.log(token);

        return res.status(200).json({
          ok: true,
          message: "Login successful!",
          authtoken: token,
        });
      } else {
        // Incorrect password
        console.log("Authentication failed: Incorrect password");
        return res.status(401).json({ message: "Authentication failed: Incorrect password" });
      }
    } else {
      // No user found with the given email
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    let msg = "Server error: " + err.message;
    // Ensure we send only one response in case of an error
    if (!res.headersSent) {
      return res.status(500).json({ message: msg });
    }
  }
};
