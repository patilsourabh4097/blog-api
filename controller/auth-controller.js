const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const {name, pass} = req.body
  const key = process.env.JWT_SECRET;

  const tempUser = await User.findOne({ userName: name });

  if (!tempUser) {
    res.json({
      err: "User dosent exist",
    });
    return;
  }

  const isAuth = await bcrypt.compare(pass, tempUser.password);
  if (isAuth) {
    const payLoad = {
      name: tempUser.userName,
      password: tempUser.password,
    };

    const token = await jwt.sign(payLoad, key);

    res.json({
      success: "logged in",
      token: token,
    });
  } else {
    res.json({
      err: "Wrong Password",
    });
  }
};

exports.signUp = async (req, res) => {
  const {name, pass} = req.body

  const tempUser = await User.findOne({ userName: name });
  if (tempUser) {
    res.json({
      err: "User already exists",
    });
    return;
  }

  hashedPassword = await bcrypt.hash(pass, 10);

  let newUser = new User({
    userName: name,
    password: hashedPassword,
  });

  await newUser.save((err) => {
    if (err) {
      res.json({
        err,
      });
      return;
    }
  });

  res.json({
    success: "successfully signed up",
  });
};

exports.isAuth = (req, res, next) => {
  if (!req.headers.auth) {
    res.json({
      err: "not logged in",
    });
    return;
  }

  let token = req.headers.auth;
  token = token.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.json({
        err: "Invalid token : Login ",
      });
      return;
    }

    const tempUser = await User.findOne({ userName: decoded.name });

    if (!tempUser) {
      res.json({
        err: "Invalid User",
      });
      return;
    }
    req.user = tempUser;

    next();
  });
};
