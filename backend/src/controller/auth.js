require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/JWT");
const Form = require("../models/form");

async function register(req, res) {
  // checking if user already exists
  try {
    const record = req.body;
    const checkUser = await User.findOne({ email: record.email });

    if (checkUser) {
      return res.status(400).send("User already exist for this email.");
    }
    //process.env.Salt
    const hashedPassword = await bcrypt.hash(
      record.password,
      parseInt(process.env.SALTROUNDS)
    );
    const response = await User.create({
      name: record.name,
      email: record.email,
      password: hashedPassword,
      phone: record.phone,
    });

    const token = await generateToken(response);

    record.token = token;

    return res.status(201).json({ response, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function login(req, res) {
  const record = req.body;
  const userExist = await User.findOne({ email: record.email })
    .lean()
    .select(" -__v");

  if (!userExist) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(record.password, userExist.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const token = await generateToken(userExist);
  res.json({
    ...userExist,
    token,
  });
}

async function getProfile(req, res) {
  try {
    // Find user without sending password and version key (__v)
    const userId = req.user.id;
    const user = await User.findById(req.user.id).select("-password -__v");
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("No user exists with such id");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { register, login, getProfile };
