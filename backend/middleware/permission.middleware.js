const Permission=require('../models/permission.model')

module.exports=(section, action)=>{
 return async(req,res,next)=>{
    const permission = await Permission.findOne({
        role_id: req.user.role_id,
        "sections.section_name": section
      });

      if(!Permission){
        return res.status(403).json({message:"Permission not found"})
      }

      const perms=permission.sections
      if (action === "create" && !perms.edit) {
        return res.status(403).json({ message: "Create/Edit permission denied" });
      }
      if (action === "read" && !perms.view) {
        return res.status(403).json({ message: "View permission denied" });
      }
      if (action === "update" && !perms.update) {
        return res.status(403).json({ message: "Update permission denied" });
      }
      if (action === "delete" && !perms.delete) {
        return res.status(403).json({ message: "Delete permission denied" });
      }
      next();
 }
}