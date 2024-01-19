// routes/logisticsRoutes.js
const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/AuthControllers/userControllers')
const auth = require('../../middleware/auth');


router.post('/signup', userControllers.UserRegistration);

router.post('/login', userControllers.UserLogin);

router.get('/logout' , auth, userControllers.Logout)

module.exports = router;