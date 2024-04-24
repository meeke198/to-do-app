const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
// const pool = require("./config/db")
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// Make sure the database is connected before starting the server
const { User, validateRegistration, validateLogin } = require("./model/User");
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());
// Middleware to initialize Passport
app.use(passport.initialize());

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_OR_KEY, // Replace with your own secret key
    },
    (jwtPayload, done) => {
      // Find the user based on the JWT payload
      // Validate the user or perform additional checks if needed
      // Call the done function with the user object or false if not found
      console.log({ jwtPayload });
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            // return the user to the frontend
            return done(null, user);
          }
          // return false since there is no user
          return done(null, false);
        })
        .catch((err) => console.log(err));
    }
  )
);

//NOT USING PASSPORT
app.post("/signup", async (req, res) => {
  try {
    const error = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // const error = new Error()
      return res.status(400).json({error: {message: "User already exists"}});
    }

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const savedUser = await newUser.save();

    const payload = {
      id: savedUser._id,
      userName: savedUser.userName,
      email: savedUser.email,
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
      console.log("User create successfully");
    });
  } catch (err) {
    console.log({err});
    const error = new Error();
    error.message = err.message;
    res.status(500).json({ error });
  }
});

app.post("/login", async (req, res) => {
  console.log("In login route backend");
  console.log(req.body);
  try {
    const { isValid } = validateLogin(req.body);
    console.log({isValid});
    if (!isValid) {
      return res.status(400).json({
        message: "Failed to login, please check your email/password",
      });
    }

    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      console.log({ error });
      return res.status(400).json({
        message: "Account doesn't exist, please register",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (isMatch) {
      const payload = {
        id: user._id,
        userName: user.userName,
        email: user.email,
        password: user.password,
      };

      const token = jwt.sign(payload, keys.secretOrKey, {
        expiresIn: 3600,
      });

      res.json({
        success: true,
        token: "Bearer " + token,
      });

      console.log({ token });
    } else {
      return res.status(400).json({
        message: "Failed to login user, please check your email/password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
// });
app.get("/profile", async (req, res) => {
  const result = await jwt.verify();
  res.send("This is profile page");
});

app.get("/wrongToken", (req, res) => {
  res.send("Wrong token");
});
const port = process.env.PORT || 5002;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Start your Express server or perform other operations
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`App listen on localhost ${port}`);
});

// Bản chất của authentication là xác định tính hợp lệ của 1 yêu cầu gửi tới gồm:
// - tính chính danh của người gửi
// - tính toàn vẹn của dữ liệu trên đường truyền dẫn yêu cầu tới đích.
//nguoi dung login => request => server => authen => gui lai 1 token luu o client => client gui kem token o moi request de server co the xac thuc+tra lai data
