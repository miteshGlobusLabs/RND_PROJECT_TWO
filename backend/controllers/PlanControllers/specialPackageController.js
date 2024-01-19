// controllers/specialPackageController.js
const db = require('../../db');



// posting special Package Data  

 const insertSpecialPackageDetails = async (req, res) => {
  const specialPackageData = req.body; // Assuming req.body is an array of objects

  // Define the SQL query to insert multiple special package details
  const sql = `
    INSERT INTO tbNewJobSpecialPackageDetails (
      JobNo,
      SpecialPackageNo,
      TransporterID,
      VehicleNo,
      DriverName,
      WOLineNo,
      TaskDate,
      BuyCost
    ) VALUES ?`;

  // Convert the array of objects into a 2D array of values
  const values = specialPackageData.map((item ) => [
    item.JobNo,
    item.SpecialPackageNo,
    item.TransporterID,
    item.VehicleNo,
    item.DriverName,
    item.WOLineNo,
    item.TaskDate,
    item.BuyCost
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Special package details inserted:', result);
      res.status(201).json({ message: 'Special package details inserted successfully' });
    }
  });
};


// getting special Package Data  

const getAllSpecialPackageDetails = async (req, res) => {
  const sql = 'SELECT * FROM tbNewJobSpecialPackageDetails';

  // Execute the SQL query to retrieve special package detail data
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Special package details retrieved:', rows);
      res.status(200).json(rows); // Send the retrieved data as JSON response
    }
  });
};
module.exports = {
  insertSpecialPackageDetails,
  getAllSpecialPackageDetails,
};
