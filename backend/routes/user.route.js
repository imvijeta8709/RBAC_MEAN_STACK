const router=require('express').Router();
const auth = require('../middleware/auth.middleware');
const {createUser , getUsers, updateUser, deleteUser} = require('../controllers/user.controller')

// router.post('/create',auth,createUser);
// router.get('/',auth,getUsers);
// router.put('/:id',auth,updateUser);
// router.delete('/:id',auth,deleteUser);


router.post('/create',createUser);
router.get('/',getUsers);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
module.exports = router;