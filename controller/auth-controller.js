const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = async (req, res) => {
  const { name, password } = req.body;
  const key = process.env.JWT_SECRET;

  const user = await User.findOne({ userName: name });

  if (!user) {
    res.status(404).json({
      err: "User dosent exist",
    });
    return;
  }

  const isAuth = await bcrypt.compare(password, user.password);
  if (isAuth) {
    const payLoad = {
      name: user.userName,
      password: user.password,
    };

    const token = await jwt.sign(payLoad, key);

    res.status(200).json({
      success: "logged in",
      token,
    });
  } else {
    res.status(404).json({
      err: "Wrong Password",
    });
  }
};

exports.signUp = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ userName: name });
  if (user) {
    res.status(400).json({
      err: "User already exists",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser = new User({
    userName: name,
    password: hashedPassword,
  });

  newUSer = await newUser.save((err) => {
    if (err) {
      res.status(404).json({
        err,
      });
      return;
    }
  });

  res.status(200).json({
    success: "successfully signed up",
    id: newUser._id,
  });
};

exports.isAuth = (req, res, next) => {
  let token = req.headers.auth;
  if (!token) {
    res.status(404).json({
      err: "not logged in",
    });
    return;
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.json({
        err: "Invalid token : Login ",
      });
      return;
    }

    const user = await User.findOne({ userName: decoded.name });

    if (!user) {
      res.status(404).json({
        err: "Invalid User",
      });
      return;
    }
    req.user = user;

    next();
  });
};
