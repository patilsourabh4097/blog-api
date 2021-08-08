const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = async (req, res) => {
  const {name, password} = req.body
  const key = process.env.JWT_SECRET;

  const user = await User.findOne({ userName: name });

  if (!user) {
    res.json({
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

    res.json({
      success: "logged in",
      token
    });
  } else {
    res.json({
      err: "Wrong Password",
    });
  }
};

exports.signUp = async (req, res) => {
  const {name, password} = req.body

  const user = await User.findOne({ userName: name });
  if (user) {
    res.json({
      err: "User already exists",
    });
    return;
  }

  hashedPassword = await bcrypt.hash(password, 10);

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
    id:newUser._id
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

    const user = await User.findOne({ userName: decoded.name });

    if (!user) {
      res.json({
        err: "Invalid User",
      });
      return;
    }
    req.user = user;

    next();
  });
};
