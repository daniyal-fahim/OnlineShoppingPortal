CREATE TABLE users( 
  USER_ID VARCHAR(12) UNIQUE NOT NULL,
  EMAIL VARCHAR(50) UNIQUE,
  PASSWORD VARCHAR(100),
  FNAME VARCHAR(50),
  LNAME VARCHAR(50),
  CNIC VARCHAR(20) UNIQUE,
  GENDER VARCHAR(10) DEFAULT NULL,
  NATIONALITY VARCHAR(50),
  DOB DATE,  
  JOINED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UPDATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (USER_ID)
);

email:tempuser@gmail.com
password:tempuser
//dob,↵    fname,↵    lname,↵    cnic,↵    nationality,↵    gender,↵    email,↵    password,:
dob:2004-08-11
fname:Daniyal
lname:Fahim
cnic:4928724896498
gender:Male
nationality:Pakistani