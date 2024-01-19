

// routes/manPowerRoutes.js
const express = require('express');
const router = express.Router();
const manPowerController = require('../../controllers/PlanControllers/manPowerController');

router.post('/', manPowerController.insertManPowerDetails);
router.get('/', manPowerController.getAllManPowerDetails);

module.exports = router;
