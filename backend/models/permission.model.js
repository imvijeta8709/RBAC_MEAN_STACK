const mongoose=require('mongoose')

const permissionSchema=new mongoose.Schema({
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    sections: [
        {
          section_name: { type: String, required: true },
          editL: { type: Boolean, default: false },
          view: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          update: { type: Boolean, default: false }
        }
      ]
},
{
  timestamps: true
})


module.exports=mongoose.model("Permission",permissionSchema)