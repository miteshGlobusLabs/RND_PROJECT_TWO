// router.get('/orderByOne', (req, res) => {
//   // Define the SQL query to retrieve job ManPower details where orderByNo is 1
//   const sql = 'SELECT * FROM tbWorkOrderDetails WHERE orderByNo = 1';

//   // Execute the SQL query to retrieve ManPower detail data
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.error('MySQL query error:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       console.log('Job ManPower details retrieved:', rows);
//       res.status(200).json(rows); // Send the retrieved data as JSON response
//     }
//   });
// });

// router.get('/orderByTwo', (req, res) => {
//   // Define the SQL query to retrieve job ManPower details where orderByNo is 1
//   const sql = 'SELECT * FROM tbWorkOrderDetails WHERE orderByNo = 2';

//   // Execute the SQL query to retrieve ManPower detail data
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.error('MySQL query error:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       console.log('Job ManPower details retrieved:', rows);
//       res.status(200).json(rows); // Send the retrieved data as JSON response
//     }
//   });
// });

// router.get('/orderByThree', (req, res) => {
//   // Define the SQL query to retrieve job ManPower details where orderByNo is 1
//   const sql = 'SELECT * FROM tbWorkOrderDetails WHERE orderByNo = 3';

//   // Execute the SQL query to retrieve ManPower detail data
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.error('MySQL query error:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       console.log('Job ManPower details retrieved:', rows);
//       res.status(200).json(rows); // Send the retrieved data as JSON response
//     }
//   });
// });

// router.get('/orderByFour', (req, res) => {
//   // Define the SQL query to retrieve job ManPower details where orderByNo is 1
//   const sql = 'SELECT * FROM tbWorkOrderDetails WHERE orderByNo = 4';

//   // Execute the SQL query to retrieve ManPower detail data
//   db.query(sql, (err, rows) => {
//     if (err) {
//       console.error('MySQL query error:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       console.log('Job ManPower details retrieved:', rows);
//       res.status(200).json(rows); // Send the retrieved data as JSON response
//     }
//   });
// });

// routes/workOrderRoutes.js
const express = require("express");
const router = express.Router();
const workOrderController = require("../../controllers/MasterControllers/workOrderController");

router.post("/", workOrderController.insertWorkOrderDetails);
router.get("/", workOrderController.getAllWorkOrderDetails);

router.get("/orderByOne", async (req, res) => {
  await workOrderController.getOrderDetailsByOrderNo(req, res, 1);
});

router.get("/orderByTwo", async (req, res) => {
  await workOrderController.getOrderDetailsByOrderNo(req, res, 2);
});

router.get("/orderByThree", async (req, res) => {
  await workOrderController.getOrderDetailsByOrderNo(req, res, 3);
});

router.get("/orderByFour", async (req, res) => {
  await workOrderController.getOrderDetailsByOrderNo(req, res, 4);
});

// Get work order details by ServiceLineNo
router.get("/:ServiceLineNo", workOrderController.getWorkOrderByServiceLineNo);

// Update work order details by ServiceLineNo
router.patch(
  "/:ServiceLineNo",
  workOrderController.updateWorkOrderByServiceLineNo
);

// Delete work order details by ServiceLineNo
router.delete(
  "/:ServiceLineNo",
  workOrderController.deleteWorkOrderByServiceLineNo
);

module.exports = router;
