const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegister, validate } = require('../validators/validationRules');
const router = express.Router();

router.post('/register', validateRegister, validate, registerUser);
router.post('/login', loginUser);

module.exports = router;