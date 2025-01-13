
import pool from "../../config/db.js";
import { getGId } from "./getUserId.js";



export const getuserfname = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT fname FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            console.log(user.fname);
            res.json({fname: user.fname });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getuserlname = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT lname FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json({lname:user.lname});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getuserfullname = async (req, res) => {
    const user_id = getGId(); // Get user ID (presumed from some session or JWT)
  
    if (!user_id) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      let temp;
  
      // Determine the correct query based on user ID prefix
      if (user_id.startsWith('U')) {
        // Query for regular users
        temp = await pool.query('SELECT lname, fname, email FROM users WHERE user_id = $1', [user_id]);
      } else if (user_id.startsWith('AD')) {
        // Query for admins
        temp = await pool.query('SELECT lname, fname, email FROM administration WHERE admin_id = $1', [user_id]);
      } else {
        // Handle unknown user_id format
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      // If the query returns a valid result
      if (temp.rows.length > 0) {
        const user = temp.rows[0];
        const fullName = `${user.fname} ${user.lname}`;
        res.json({
          fullname: fullName,
          email: user.email,
        });
      } else {
        // If no results found
        res.status(404).json({ message: "User not found" });
      }
  
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ message: `Server error: ${err.message}` });
    }
  };
  
export const getuseremail = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT email FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            var email=user1.email;
            res.json({ email: email }); 
            console.log("email is retrieved :"+email);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getusercnic = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT cnic FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json({cnic:user1.cnic});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getusernationality = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT nationality FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json({nationality:user1.nationality});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};


export const getuserdob = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT dob FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user1 = temp.rows[0];
            res.json({dob:user1.dob});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};
export const getuserjoindate = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT joined FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json({joined:user.joined});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};

export const getuserupdatetime = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
        const temp = await pool.query('SELECT updated FROM users WHERE user_id = $1', [user_id]);

        if (temp.rows.length > 0) {
            const user = temp.rows[0];
            res.json({updated:user.updated});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        let msg = "Server error: " + err.message;
        res.status(500).json({ message: msg });
    }
};


export const getuserid = async (req, res) => {
    const user_id = getGId();
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    res.json({user_id:user_id});
   
};
