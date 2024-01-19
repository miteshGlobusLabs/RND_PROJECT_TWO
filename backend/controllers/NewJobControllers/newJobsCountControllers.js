

const db = require('../../db'); 
const express = require('express');


  // Helper function for database query
  async function getCount(jobTransactionType) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT COUNT(*) AS count FROM tbNewJobs WHERE JobTransactionType = ?';
      const params = [jobTransactionType];
  
      db.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].count);
        }
      });
    });
  }


// count inside to inside 
const getCountInsideToInside = async (req, res) => {
    const jobTransactionType = 'Inside To Inside';
  
    try {
      const results = await getCount(jobTransactionType);
  
      const count = results[0].count;
      console.log(`Count of rows with JobTransactionType '${jobTransactionType}':`, count);
      
      res.status(200).json({ count });
    } catch (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  
  //count inside to outside
  const getCountInsideToOutside = async (req, res) => {
    const jobTransactionType = 'Inside To Outside';
  
    try {
      const count = await getCount(jobTransactionType);
      console.log(`Count of rows with JobTransactionType '${jobTransactionType}':`, count);
  
      res.status(200).json({ count });
    } catch (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  //count outside To inside 
  const getCountOutsideToInside = async (req, res) => {
    const jobTransactionType = 'Outside To Inside';
  
    try {
      const count = await getCount(jobTransactionType);
      console.log(`Count of rows with JobTransactionType '${jobTransactionType}':`, count);
  
      res.status(200).json({ count });
    } catch (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  
  const getCountOutsideToOutside = async (req, res) => {
    const jobTransactionType = 'Outside To Outside';
  
    try {
      const count = await getCount(jobTransactionType);
      console.log(`Count of rows with JobTransactionType '${jobTransactionType}':`, count);
  
      res.status(200).json({ count });
    } catch (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  





  module.exports = {
   
    getCountInsideToInside,
    getCountInsideToOutside,
    getCountOutsideToInside,
    getCountOutsideToOutside,
    

  };
  