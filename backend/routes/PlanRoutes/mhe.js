// routes/mheRoutes.js
const express = require('express');
const router = express.Router();
const mheController = require('../../controllers/PlanControllers/mheController');

router.post('/', mheController.insertMheDetails);
router.get('/', mheController.getAllMheDetails);

module.exports = router;
