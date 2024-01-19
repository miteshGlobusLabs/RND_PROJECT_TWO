// routes/logisticsRoutes.js
const express = require('express');
const router = express.Router();
const jobLogisticsController = require('../../controllers/PlanControllers/logisticsController');

router.post('/', jobLogisticsController.insertJobLogistics);
router.get('/', jobLogisticsController.getAllJobLogistics);

module.exports = router;