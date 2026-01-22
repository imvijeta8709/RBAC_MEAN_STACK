const router=require('express').Router();
const auth = require('../middleware/auth.middleware');
const {createRole , getRoles, updateRole, deleteRole} = require('../controllers/role.controller')

router.post('/create',createRole);
router.get('/',getRoles);
router.put('/:id',updateRole);
router.delete('/:id',deleteRole);

module.exports = router;