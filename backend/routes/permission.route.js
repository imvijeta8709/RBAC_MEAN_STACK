const router=require('express').Router();
const auth = require('../middleware/auth.middleware');
const {createPermission , getPermissions, updatePermission, deletePermission} = require('../controllers/permission.controller')

router.post('/create',createPermission);
router.get('/',getPermissions);
router.put('/:id',updatePermission);
router.delete('/:id',deletePermission);

module.exports = router;