// controllers/jobsController.js

const { v4: uuidv4 } = require('uuid');
const db = require('../../db'); 

const createJob = async (req, res) => {
  try {
    // Validate the request body to ensure required fields are present
    const requiredFields = [
      'customerCode',
      'JobNo',
      'JobsStartDate',
      'JobExpectedCompleteDate',
      'JobSummary',
      'GatePassType',
      'GatePassNumber',
      'LoadReturnDate',
      'JobRequestedBy',
      'ResearcherName',
      'JobTransactionType',
      'PickupLocation',
      'DeliveryLocation',
      'Weight',
      'packageType',
    ];

    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Set JobStatus to 'pending'
    const JobsStatus = '1'; // New Job which is ready for plan = 1

    // Generate a unique UserCode
    const uniqueUserCode = uuidv4();

    // Capture the real-time JobCreationDateTime
    const JobCreationDateTime = new Date().toISOString();

    // Define the SQL query to insert a new job
    const sql = 'INSERT INTO tbNewJobs SET ?';

    // Job data to be inserted
    const jobData = {
      ...req.body,
      JobsStatus,
      UserCode: uniqueUserCode,
      JobCreationDateTime,
    };

    // Execute the SQL query to insert the job data using a promise
    const insertJob = () => {
      return new Promise((resolve, reject) => {
        db.query(sql, jobData, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const result = await insertJob();

    console.log('Job data inserted:', result);
    res.status(201).json({ message: 'Job data inserted successfully' });
  } catch (err) {
    console.error('Error handling job creation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllJobs = async (req, res) => {
  try {
    // Define the SQL query to retrieve all jobs
    const sql = 'SELECT * FROM tbNewJobs';

    // Execute the SQL query to retrieve job data using a promise
    const queryJobs = () => {
      return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const rows = await queryJobs();

    // Reverse the data
    const reversedRows = rows.reverse();
    console.log('Job data retrieved and reversed:', reversedRows);
    res.status(200).json(reversedRows); // Send the reversed data as JSON response
  } catch (err) {
    console.error('Error retrieving job data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getLastJobNo = async (req, res) => {
  try {
    // Define the SQL query to retrieve the last JobNo value
    const sql = 'SELECT JobNo FROM tbNewJobs ORDER BY JobNo DESC LIMIT 1';

    // Execute the SQL query to retrieve the last JobNo value using a promise
    const queryLastJobNo = () => {
      return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const results = await queryLastJobNo();

    if (results.length === 0) {
      res.status(404).json({ error: 'No JobNo found' });
    } else {
      // Return the last JobNo value as JSON
      res.status(200).json({ JobNo: results[0].JobNo });
    }
  } catch (err) {
    console.error('Error handling last JobNo retrieval:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// const getJobsByStatus = async (req, res) => {
//   try {
//     // Extract the job status from the request params
//     const jobStatus = req.params.jobStatus;

//     // Define the SQL query to retrieve jobs by status
//     const sql = `SELECT * FROM tbNewJobs WHERE JobsStatus = ?`;

//     // Execute the SQL query to retrieve job data using a promise
//     const queryJobsByStatus = () => {
//       return new Promise((resolve, reject) => {
//         db.query(sql, [jobStatus], (err, rows) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(rows);
//           }
//         });
//       });
//     };

//     // Using async/await to wait for the asynchronous operation
//     const rows = await queryJobsByStatus();

//     console.log('Job data retrieved:', rows);
//     res.status(200).json(rows); // Send the retrieved data as JSON response
//   } catch (err) {
//     console.error('Error retrieving job data by status:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// Controller for '/jobStatusOne'
const getJobStatusOne = (req, res) => {
  const sql = 'SELECT * FROM tbNewJobs where JobsStatus = 1';

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job data retrieved:', rows);
      res.status(200).json(rows);
    }
  });
};

// Controller for '/jobStatusTwo'
const getJobStatusTwo = (req, res) => {
  const sql = 'SELECT * FROM tbNewJobs where JobsStatus = 2';

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job data retrieved:', rows);
      res.status(200).json(rows);
    }
  });
};

// Controller for '/jobStatusThree'
const getJobStatusThree = (req, res) => {
  const sql = 'SELECT * FROM tbNewJobs where JobsStatus = 3';

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job data retrieved:', rows);
      res.status(200).json(rows);
    }
  });
};


const getJobByJobNo = async (req, res) => {
  try {
    const { JobNo } = req.params;

    // Define the SQL query to retrieve job data by JobNo
    const sql = 'SELECT * FROM tbNewJobs WHERE JobNo = ?';

    // Execute the SQL query to retrieve job data using a promise
    const queryJobByJobNo = () => {
      return new Promise((resolve, reject) => {
        db.query(sql, [JobNo], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const rows = await queryJobByJobNo();

    if (rows.length === 0) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      console.log('Job data retrieved:', rows[0]);
      res.status(200).json(rows[0]); // Send the retrieved data as JSON response
    }
  } catch (err) {
    console.error('Error retrieving job data by JobNo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






const updateJobByJobNo = async (req, res) => {
  try {
    const { JobNo } = req.params;
    const updatedJobData = req.body;

    // Check if the job with the specified JobNo exists
    const checkExistenceQuery = 'SELECT * FROM tbNewJobs WHERE JobNo = ?';

    // Execute the SQL query to check job existence using a promise
    const checkExistence = () => {
      return new Promise((resolve, reject) => {
        db.query(checkExistenceQuery, [JobNo], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const rows = await checkExistence();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the job data
    const updateQuery = 'UPDATE tbNewJobs SET ? WHERE JobNo = ?';

    // Execute the SQL query to update job data using a promise
    const updateJobData = () => {
      return new Promise((resolve, reject) => {
        db.query(updateQuery, [updatedJobData, JobNo], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const result = await updateJobData();

    console.log('Job data updated:', result);
    res.status(200).json({ message: 'Job data updated successfully' });
  } catch (err) {
    console.error('Error handling job update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const updateJobStatusToPlan = async (req, res) => {
  try {
    const { JobNo } = req.params;
    const JobsPlanDate = new Date().toISOString(); // Get current timestamp in ISO format

    // Check if the job with the specified JobNo exists
    const checkExistenceQuery = 'SELECT * FROM tbNewJobs WHERE JobNo = ?';

    // Execute the SQL query to check job existence using a promise
    const checkExistence = () => {
      return new Promise((resolve, reject) => {
        db.query(checkExistenceQuery, [JobNo], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const rows = await checkExistence();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the job data, including setting JobsStatus to 2 and adding JobsPlanDate
    const updateQuery = 'UPDATE tbNewJobs SET JobsStatus = ?, JobsPlanDate = ? WHERE JobNo = ?';

    // Execute the SQL query to update job data using a promise
    const updateJobData = () => {
      return new Promise((resolve, reject) => {
        db.query(updateQuery, ['2', JobsPlanDate, JobNo], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const result = await updateJobData();

    console.log('Job data updated:', result);
    res.status(200).json({ message: 'Job data updated successfully' });
  } catch (err) {
    console.error('Error handling job update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateJobStatusToClosed = async (req, res) => {
  try {
    const { JobNo } = req.params;
    const updatedJobData = req.body;

    // Check if the job with the specified JobNo exists
    const checkExistenceQuery = 'SELECT * FROM tbNewJobs WHERE JobNo = ?';

    // Execute the SQL query to check job existence using a promise
    const checkExistence = () => {
      return new Promise((resolve, reject) => {
        db.query(checkExistenceQuery, [JobNo], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const rows = await checkExistence();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the job data, including setting JobsStatus to 3
    const updateQuery = 'UPDATE tbNewJobs SET ? WHERE JobNo = ?';
    updatedJobData.JobsStatus = '3'; // Setting JobsStatus to 3

    // Execute the SQL query to update job data using a promise
    const updateJobData = () => {
      return new Promise((resolve, reject) => {
        db.query(updateQuery, [updatedJobData, JobNo], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const result = await updateJobData();

    console.log('Job data updated:', result);
    res.status(200).json({ message: 'Job data updated successfully' });
  } catch (err) {
    console.error('Error handling job update:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteJobByJobNo = async (req, res) => {
  try {
    const { JobNo } = req.params;

    // Define the SQL query to delete a job by JobNo
    const sql = 'DELETE FROM tbNewJobs WHERE JobNo = ?';

    // Execute the SQL query to delete the job using a promise
    const deleteJob = () => {
      return new Promise((resolve, reject) => {
        db.query(sql, [JobNo], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Using async/await to wait for the asynchronous operation
    const result = await deleteJob();

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      console.log('JobNo deleted:', result);
      res.status(201).send(); // Send a 204 No Content response on successful deletion
    }
  } catch (err) {
    console.error('Error handling job deletion:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = {
  createJob,
  getAllJobs,
  getLastJobNo,
  getJobStatusOne,
  getJobStatusTwo,
  getJobStatusThree,
  getJobByJobNo,
  deleteJobByJobNo,
  updateJobByJobNo,
  updateJobStatusToPlan,
  updateJobStatusToClosed,
  deleteJobByJobNo ,
 
};
