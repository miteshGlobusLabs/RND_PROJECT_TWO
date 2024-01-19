// controllers/transporterController.js
const db = require('../../db');

const createTransporterJob = async (req, res) => {
  try {
    const {
      TransporterID,
      Name,
      Contact_Person,
      Phone_Number,
      Address
    } = req.body;

    const sql = 'INSERT INTO tbTransporterJOB (TransporterID, Name, Contact_Person, Phone_Number, Address) VALUES (?, ?, ?, ?, ?)';

    const result = await db.queryAsync(sql, [TransporterID, Name, Contact_Person, Phone_Number, Address]);

    console.log('Transportation data inserted:', result);
    res.status(201).json({ message: 'Transportation data inserted successfully' });
  } catch (err) {
    console.error('Error handling job creation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllTransporterJobs = async (req, res) => {
  try {
    const sql = 'SELECT * FROM tbTransporterJOB';
    const rows = await db.queryAsync(sql);

    console.log('Transportation details retrieved:', rows);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error handling job retrieval:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTransporterJobById = async (req, res) => {
  try {
    const { TransporterID } = req.params;
    const sql = 'SELECT * FROM tbTransporterJOB WHERE TransporterID = ?';
    const rows = await db.queryAsync(sql, [TransporterID]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'TransporterID not found' });
    } else {
      console.log('TransporterID data retrieved:', rows[0]);
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error('Error handling job retrieval by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTransporterJobById = async (req, res) => {
  try {
    const { TransporterID } = req.params;
    const updatedJobData = req.body;

    const checkExistenceQuery = 'SELECT * FROM tbTransporterJOB WHERE TransporterID = ?';
    const rows = await db.queryAsync(checkExistenceQuery, [TransporterID]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'TransporterID not found' });
    }

    const updateQuery = 'UPDATE tbTransporterJOB SET ? WHERE TransporterID = ?';
    const result = await db.queryAsync(updateQuery, [updatedJobData, TransporterID]);

    console.log('TransporterID data updated:', result);
    res.status(200).json({ message: 'Transporter job details updated successfully' });
  } catch (err) {
    console.error('Error handling job update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTransporterJobById = async (req, res) => {
  try {
    const { TransporterID } = req.params;
    const sql = 'DELETE FROM tbTransporterJOB WHERE TransporterID = ?';

    const result = await db.queryAsync(sql, [TransporterID]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'TransporterID not found' });
    } else {
      console.log('TransporterID deleted:', result);
      res.status(200).json({ message: 'Transporter job details deleted successfully' });
    }
  } catch (err) {
    console.error('Error handling job deletion:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createTransporterJob,
  getAllTransporterJobs,
  getTransporterJobById,
  updateTransporterJobById,
  deleteTransporterJobById
};
