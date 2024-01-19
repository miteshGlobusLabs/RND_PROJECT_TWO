// routes/specialPackageRoutes.js
const express = require('express');
const router = express.Router();
const specialPackageController = require('../../controllers/PlanControllers/specialPackageController');

router.post('/', specialPackageController.insertSpecialPackageDetails);
router.get('/', specialPackageController.getAllSpecialPackageDetails);

module.exports = router;
