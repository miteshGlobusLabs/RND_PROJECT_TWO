const db = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateUniqueUserId } = require('./utils');

const SECRET_KEY = "miteshpradhanArkaJainUniversity";

const UserRegistration = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
 
  const user_id = generateUniqueUserId();
  // const role = "user";

  // // Check if passwords match
  // if (password !== confirm_password) {
  //   return res.status(400).json({ error: "Passwords do not match" });
  // }

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserting user into the database
  const insertUserQuery =
    "INSERT INTO tbUser (user_id, first_name, last_name, email,  password_hash) VALUES (?, ?, ?, ?, ?)";

  db.query(
    insertUserQuery,
    [user_id, first_name, last_name, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("User registered successfully");
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  );
};


const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  // Fetch user from the database based on the email
  const selectUserQuery = "SELECT * FROM tbUser WHERE email = ?";

  db.query(selectUserQuery, [email], async (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        const user = result[0];

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {
          // Passwords match, generate JWT token
          const token = jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.SECRET_KEY || SECRET_KEY, // Use environment variable or fallback to a hardcoded key
            { expiresIn: "1h" }
          );
          res.cookie("token", token, { httpOnly: true });

          // Avoid logging sensitive information
          console.log("User authenticated successfully");

          res.json({
            message: "Login successful",
            user: {
              user_id: user.user_id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              role: user.role,
            },
            token,
          });
        } else {
          // Passwords do not match
          console.log("Invalid password");
          res.status(401).json({ error: "Invalid password" });
        }
      } else {
        // User not found
        console.log("User not found");
        res.status(404).json({ error: "User not found" });
      }
    }
  });
};


const Logout = (req, res) => {
  // Clear the token cookie on the client-side
  // res.clearCookie("token", { httpOnly: true });
  try {
    // Clear the token cookie by setting an expired date

    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  UserRegistration,
  UserLogin,
  Logout,
};






