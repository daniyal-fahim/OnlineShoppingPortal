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
      const user_id=user.user_id;
      if (match ) {
        setGId(user_id);

        var data = {
          user_id,
        };

        var token = jwt.sign(
          {
            data,
          },
          secret,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 3600000,
          path: "/",
        });
       
        console.log("Authentication successful");
        console.log(token);
        res.status(200).json({
          ok: true,
          message: "Login successful!",
          authtoken: token,
        });
      } else {
      
        console.log("Authentication failed: Incorrect password");
         res.status(500).json({ message: "Authentication failed: Incorrect password" });

      }
    } else {
      // No user found with the given email
    res.status(500).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    let msg="Server error "+err.message ;
    res.status(500).json({ message: msg  });
  }
};
