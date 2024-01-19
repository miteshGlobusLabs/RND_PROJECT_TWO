// controllers/mheController.js
const db = require('../../db');


// posting MHE data  

const insertMheDetails = async (req, res) => {
  const mheData = req.body; // Assuming req.body is an array of objects

  // Define the SQL query to insert multiple job MHE details
  const sql =
    'INSERT INTO tbNewJobMHEDetails (JobNo, TransporterID, VehicleCategory, VehicleType, VehicleNo, DriverName, Hours, WOLineNo, TaskDate, BuyCost) VALUES ?';

  // Convert the array of objects into a 2D array of values
  const values = mheData.map((item) => [
    item.JobNo,
    item.TransporterID,
    item.VehicleCategory,
    item.VehicleType,
    item.VehicleNo,
    item.DriverName,
    item.Hours,
    item.WOLineNo,
    item.TaskDate,
    item.BuyCost,
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job MHE details inserted:', result);
      res.status(201).json({ message: 'Job MHE details inserted successfully' });
    }
  });

};


// getting Mhe data  

const getAllMheDetails = async (req, res) => {
  const sql = 'SELECT * FROM tbNewJobMHEDetails';

  // Execute the SQL query to retrieve MHE detail data
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job MHE details retrieved:', rows);
      res.status(200).json(rows); // Send the retrieved data as JSON response
    }
  });
};

















module.exports = {
  insertMheDetails,
  getAllMheDetails,
};
