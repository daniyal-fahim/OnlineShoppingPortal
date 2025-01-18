import transporter from "../../Config/Email_OTP/NodeMailer_Config.js";
import pool from "../../Config/DataBase/DB_Config.js";
import { getGId } from "../User_Seller/getUserId.js";
import { setOTP } from "./getOtp.js";

export const EmailSender = async (req, res) => {
  try {
    console.log(getGId());
    const { email1, fname, lname } = req.body;
    var email=email1;
    let username = fname ? `${fname} ${lname}` : '';
    let otp = Math.floor(Math.random() * 99999);

    if (!email) {
      const user_id = getGId();
      if(user_id[0]=='U')
        {const temp = await pool.query(
        "SELECT lname, fname, email FROM users WHERE user_id = $1",
        [user_id]
      );
    
      if (temp.rows.length > 0) {
        const user = temp.rows[0];
        username = `${user.fname} ${user.lname}`;
        email = user.email;
        console.log(email +' '+ username);
      } else {
        return res.status(404).json({ message: "User not found" });
      }}
      else{
        const temp = await pool.query(
          "SELECT lname, fname, email FROM administration WHERE admin_id = $1",
          [user_id]
        );
      
        if (temp.rows.length > 0) {
          const user = temp.rows[0];
          username = `${user.fname} ${user.lname}`;
          email = user.email;
          console.log(email +' '+ username);
        } else {
          return res.status(404).json({ message: "Admin not found" });
        }
      }
    }

    const msg = `
**Subject:** Verify Your Email for Secure Access to Your D_Virtual_Shopping Account  

**Dear ${username},**  

To ensure the security of your D_Shopping account, we’ve implemented an email verification process. This step ensures only authorized access and helps protect your personal information.  

### **Your Email Verification Code**  
Your secure verification code is: **${otp}**  

Please enter this code on the verification page within the next 10 minutes to complete your account setup or login. For your safety, this code will expire after 10 minutes. If the time lapses, you can request a new code.  

### **What to Do if You Did Not Request This Code**  
If you did not initiate this request, please disregard this email. If you suspect any unauthorized activity, contact our customer support team immediately at [support email] or [support phone number].  

At **D_Virtual_Shopping**, your trust is our top priority, and we are committed to safeguarding your account and personal information.  

Thank you for choosing **D_Virtual_Shopping** for your online shopping needs.  

**Best regards,**  
The D_Virtual_Shopping Security Team
    `;

    const receivers = [
      email,
    ];

    const info = await transporter.sendMail({
      from: '"D pay" <daniyal237fahim@gmail.com>',
      to: receivers,
      subject: "DPAY TWO FACTOR AUTHENTICATION",
      text: msg,
    });

    setOTP(otp);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
