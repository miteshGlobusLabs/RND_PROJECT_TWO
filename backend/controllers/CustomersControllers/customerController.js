// controllers/customerController.js
const db = require('../../db');

// Create a new customer
exports.createCustomer = async (req, res) => {
  const {
    customerCode,
    customerName,
    address,
    city,
    pin,
    phone1,
    phone2,
    email,
    website,
    contactPerson,
  } = req.body;

  const sql =
    'INSERT INTO tbCustomersMaster (customerCode, customerName, address, city, pin, phone1, phone2, email, website, contactPerson) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  try {
    const result = await db.query(sql, [
      customerCode,
      customerName,
      address,
      city,
      pin,
      phone1,
      phone2,
      email,
      website,
      contactPerson,
    ]);

    console.log('Customer data inserted:', result);
    res.status(201).json({ message: 'Customer data inserted successfully' });
  } catch (err) {
    console.error('MySQL query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all customers in reverse order
exports. getAllCustomers = async (req, res) => {
  try {
    // Define the SQL query to retrieve all customers
    const sql = 'SELECT * FROM tbCustomersMaster';

    // Execute the SQL query to retrieve customer data
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Reverse the data
    const reversedRows = rows.reverse();
    console.log('Customer data retrieved and reversed:', reversedRows);
    res.status(200).json(reversedRows); // Send the reversed data as JSON response
  } catch (error) {
    console.error('MySQL query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// get update by customers code
exports. updateCustomerByCode = async (req, res) => {
  try {
    const { customerCode } = req.params;
    const updatedCustomerData = req.body;

    // Define the SQL query to update customer data by customerCode
    const sql = 'UPDATE tbCustomersMaster SET ? WHERE customerCode = ?';

    // Execute the SQL query to update customer data
    const result = await new Promise((resolve, reject) => {
      db.query(sql, [updatedCustomerData, customerCode], (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      console.log('Customer data updated:', result);
      res.status(200).json({ message: 'Customer data updated successfully' });
    }
  } catch (err) {
    console.error('Error updating customer data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports. getAllCustomerCodes = async (req, res) => {
  try {
    // Define the SQL query to retrieve only the customercode column
    const sql = 'SELECT customerCode FROM tbCustomersMaster';

    // Execute the SQL query to retrieve customer codes
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log('Customer codes retrieved:', rows);
    res.status(200).json(rows); // Send the retrieved data as JSON response
  } catch (err) {
    console.error('Error retrieving customer codes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports. getLastCustomerCode = async (req, res) => {
  try {
    // Define the SQL query to retrieve the last customerCode
    const sql = 'SELECT customerCode FROM tbCustomersMaster ORDER BY customerCode DESC LIMIT 1';

    // Execute the SQL query to retrieve the last customerCode
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (rows.length === 0) {
      res.status(404).json({ error: 'No customer codes found' });
    } else {
      const lastCustomerCode = rows[0].customerCode;
      console.log('Last CustomerCode retrieved:', lastCustomerCode);
      res.status(200).json({ customerCode: lastCustomerCode }); // Send the retrieved data as JSON response
    }
  } catch (err) {
    console.error('Error retrieving last customer code:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports. getCustomerByCode = async (req, res) => {
  try {
    const { customerCode } = req.params;

    // Define the SQL query to retrieve customer data by customerCode
    const sql = 'SELECT * FROM tbCustomersMaster WHERE customerCode = ?';

    // Execute the SQL query to retrieve customer data
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, [customerCode], (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      console.log('Customer data retrieved:', rows[0]);
      res.status(200).json(rows[0]); // Send the retrieved data as JSON response
    }
  } catch (err) {
    console.error('Error retrieving customer data by code:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports. deleteCustomerByCode = async (req, res) => {
  try {
    const { customerCode } = req.params;

    // Define the SQL query to delete a customer by customerCode
    const sql = 'DELETE FROM tbCustomersMaster WHERE customerCode = ?';

    // Execute the SQL query to delete the customer
    const result = await new Promise((resolve, reject) => {
      db.query(sql, [customerCode], (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      console.log('Customer deleted:', result);
      res.status(204).send(); // Send a 204 No Content response on successful deletion
    }
  } catch (err) {
    console.error('Error deleting customer by code:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};








// module.exports = {
//   deleteCustomerByCode,
// };