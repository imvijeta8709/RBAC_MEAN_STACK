const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    description: {type:String},
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true 
  });

module.exports = mongoose.model('Role', RoleSchema);
