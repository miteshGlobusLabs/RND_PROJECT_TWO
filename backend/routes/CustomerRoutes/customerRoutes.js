
// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/CustomersControllers/customerController');

// Create a new customer
router.post('/', customerController.createCustomer);

// Get all customers in reverse order
router.get('/', customerController.getAllCustomers);

// Update customer data by customerCode
router.put('/:customerCode', customerController.updateCustomerByCode);

// Get all customer codes
router.get('/customercode', customerController.getAllCustomerCodes);

// Get the last customer code
router.get('/lastCustomerCode', customerController.getLastCustomerCode);

// Get customer details by customerCode
router.get('/:customerCode', customerController.getCustomerByCode);

// Delete customer by customerCode
router.delete('/:customerCode', customerController.deleteCustomerByCode);

module.exports = router;
