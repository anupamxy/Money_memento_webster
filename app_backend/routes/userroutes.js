const express = require('express');
const registerUser = require('../controller/userController');
const authUser=require('../controller/userController');
const allUsers=require('../controller/userController');
const {protect}=require('../middleware/authMiddleware')
const router = express.Router();

router.route('/').post(registerUser).get(protect,allUsers);
router.post('/login',authUser);


module.exports = router;
