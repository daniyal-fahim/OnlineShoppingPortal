
import pool from "../../Config/DataBase/DB_Config.js";
import { bcrypt } from "../../Config/JWT_Authentication/JWT_Config.js";


//generate unique user_id
const getIdNum = () => {
  let Id = '';  // Use a meaningful variable name
  Id += 'U-'
  for (let i = 0; i < 4; i++) {
    Id += Math.floor(Math.random() * 10).toString();  // Generate a digit from 0-9
  }
  return Id;  // Return the generated account number
}

const checkDuplicateId = async () => {
  let Id = getIdNum();  // Get a new account number
  const checkAcc = await pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [Id]
  );
  if (checkAcc.rows.length > 0) {
    console.log(Id);
    return await checkDuplicateId();
  } else {
    return Id;
  }
}

export const register = async (req, res) => {
  const {dob,
    fname,
    lname,
    cnic,
    nationality,
    gender,
    email,
    password,
  } = req.body;
  //dob,fname,lname,cnic,nationality,info,gender,account_number,email,password;

  try {
    let user_id = await checkDuplicateId();
    // Check if the user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    await pool.query(
      "INSERT INTO users (user_id, dob, fname, lname, cnic, nationality, gender, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [user_id, dob, fname, lname, cnic, nationality, gender, email, hashedPassword]
    );
    res.status(200).json({ message: "User registered successfully" });
  }
  catch (err) {
    console.error(err.message);
    let msg = "Server error " + err.message;
    res.status(500).json({ message: msg });
  }
};
