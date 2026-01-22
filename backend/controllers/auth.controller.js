const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    if (!name || !email || !password || !role_id) {
      return res.status(400).json({
        code: 400,
        status: "FAILED",
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        code: 409,
        status: "FAILED",
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role_id,
    });

    await user.save();

    return res.status(201).json({
      code: 201,
      status: "OK",
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        status: "FAILED",
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).populate('role_id');

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        code: 401,
        status: "FAILED",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role_id: user.role_id._id,
        role_name: user.role_id.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: err.message,
    });
  }
};
