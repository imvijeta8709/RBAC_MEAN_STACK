const Permission = require('../models/permission.model');

exports.createPermission = async (req, res) => {
  try {
    const { role_id, sections } = req.body;

    if (!role_id || !sections) {
      return res.status(400).json({
        code: 400,
        status: "FAILED",
        message: "role_id and sections are required",
      });
    }

    const permission = new Permission({ role_id, sections });
    await permission.save();

    return res.status(201).json({
      code: 201,
      status: "OK",
      message: "Permission created successfully",
      data: permission,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find().populate('role_id');

    if (!permissions || permissions.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "Permissions not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Permissions fetched successfully",
      data: permissions,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const { sections } = req.body;

    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { sections },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "Permission not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Permission updated successfully",
      data: updatedPermission,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedPermission = await Permission.findByIdAndDelete(id);

    if (!deletedPermission) {
      return res.status(404).json({
        code: 404,
        status: "FAILED",
        message: "Permission not found",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      message: "Permission deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "FAILED",
      message: error.message,
    });
  }
};
