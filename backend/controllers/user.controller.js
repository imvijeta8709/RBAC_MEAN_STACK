const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role_id');

    if (!users || users.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "No users found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    if (!name || !email || !password || !role_id) {
      return res.status(400).json({
        code: 400,
        status: "FAILED",
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        code: 409,
        status: "FAILED",
        message: "Email already exists",
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
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role_id } = req.body;

    // Hash password only if provided
    let updatedData = { name, email, role_id };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "User not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "User not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};
