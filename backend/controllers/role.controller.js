const Role = require('../models/role.model');

exports.createRole = async (req, res) => {
  try {
    const { role_name ,description} = req.body;

    if (!role_name) {
      return res.status(400).json({
        code: 400,
        status: "FAILED",
        message: "Role name is required",
      });
    }

    const role = new Role({ role_name,description });
    await role.save();

    return res.status(201).json({
      code: 201,
      status: "OK",
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ is_deleted: false });

    if (!roles || roles.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "Roles not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role_name, is_active,description } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { role_name, is_active },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "Role not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedRole = await Role.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );

    if (!deletedRole) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "Role not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Role deleted successfully",
      data: deletedRole,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};
