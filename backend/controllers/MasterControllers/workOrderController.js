// controllers/workOrderController.js
const db = require('../../db');

const insertWorkOrderDetails = async (req, res) => {
  try {
    const {
      orderByNo,
      ServiceDescription,
      ServiceLineNo,
      UoM,
      ContractRate,
    } = req.body;

    // Define the SQL query to insert a new item
    const sql = 'INSERT INTO tbWorkOrderDetails (orderByNo, ServiceDescription, ServiceLineNo, UoM, ContractRate) VALUES (?, ?, ?, ?, ?)';

    // Execute the SQL query to insert the item data
    await db.query(
      sql,
      [orderByNo, ServiceDescription, ServiceLineNo, UoM, ContractRate]
    );

    console.log('Item data inserted successfully');
    res.status(201).json({ message: 'Item data inserted successfully' });
  } catch (err) {
    console.error('Error inserting item data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllWorkOrderDetails = async (req, res) => {
  try {
    // Define the SQL query to retrieve all work order details
    const sql = 'SELECT * FROM tbWorkOrderDetails';

    // Execute the SQL query to retrieve work order detail data
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

    console.log('Work order details retrieved:', rows);
    res.status(200).json(rows); // Send the retrieved data as JSON response
  } catch (err) {
    console.error('Error retrieving work order details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const getOrderDetailsByOrderNo = (req, res, orderByNo) => {
//   const sql = `SELECT * FROM tbWorkOrderDetails WHERE orderByNo = ${orderByNo}`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.error('MySQL query error:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       console.log(`Job ManPower details retrieved for orderByNo ${orderByNo}:`, rows);
//       res.status(200).json(rows);
//     }
//   });
// };


const getOrderDetailsByOrderNo = async (req, res, orderByNo) => {
  const sql = `SELECT * FROM tbWorkOrderDetails WHERE orderByNo = ${orderByNo}`;

  try {
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    console.log(`Job ManPower details retrieved for orderByNo ${orderByNo}:`, rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error('MySQL query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getWorkOrderByServiceLineNo = async (req, res) => {
  try {
    const { ServiceLineNo } = req.params;

    // Define the SQL query to retrieve work order details by ServiceLineNo
    const sql = 'SELECT * FROM tbWorkOrderDetails WHERE ServiceLineNo = ?';

    // Execute the SQL query to retrieve work order detail data
    const rows = await new Promise((resolve, reject) => {
      db.query(sql, [ServiceLineNo], (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    console.log('Work order details retrieved:', rows);
    res.status(200).json(rows); // Send the retrieved data as JSON response
  } catch (err) {
    console.error('Error retrieving work order details by ServiceLineNo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateWorkOrderByServiceLineNo = async (req, res) => {
  try {
    const { ServiceLineNo } = req.params;
    const updatedWorkOrderData = req.body;

    // Check if the work order with the specified ServiceLineNo exists
    const checkExistenceQuery = 'SELECT * FROM tbWorkOrderDetails WHERE ServiceLineNo = ?';
    const rows = await new Promise((resolve, reject) => {
      db.query(checkExistenceQuery, [ServiceLineNo], (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    // Update the work order data
    const updateQuery = 'UPDATE tbWorkOrderDetails SET ? WHERE ServiceLineNo = ?';
    await db.query(updateQuery, [updatedWorkOrderData, ServiceLineNo]);

    console.log('Work order data updated successfully');
    res.status(200).json({ message: 'Work order details updated successfully' });
  } catch (err) {
    console.error('Error handling work order update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteWorkOrderByServiceLineNo = async (req, res) => {
  try {
    const { ServiceLineNo } = req.params;

    // Define the SQL query to delete a work order by ServiceLineNo
    const sql = 'DELETE FROM tbWorkOrderDetails WHERE ServiceLineNo = ?';

    // Execute the SQL query to delete the work order
    const result = await db.query(sql, [ServiceLineNo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    console.log('Work order deleted successfully');
    res.status(204).send(); // Send a 204 No Content response on successful deletion
  } catch (err) {
    console.error('Error handling work order deletion:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  insertWorkOrderDetails,
  getAllWorkOrderDetails,
  getOrderDetailsByOrderNo,
  getWorkOrderByServiceLineNo,
  updateWorkOrderByServiceLineNo,
  deleteWorkOrderByServiceLineNo,
 
};
