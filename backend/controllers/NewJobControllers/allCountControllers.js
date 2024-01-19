//controllers/NewJobControllers/allCountControllers
const db = require('../../db');
const express = require('express');
const router = express.Router();


const queryDatabase = (sql) => {
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
  
  exports.getPlanJobTransactions = async (req, res, next) => {
    try {
      const sql = `
        SELECT
            JobTransactionType,
            COUNT(*) AS TransactionCount
        FROM
            tbNewJobs
        WHERE
            JobsStatus = '1'
            AND JobTransactionType IN ('Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside')
        GROUP BY
            JobTransactionType;
      `;
  
      const results = await queryDatabase(sql);
      res.json(results);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  };
  
  exports.getClosedJobTransactions = async (req, res) => {
    try {
      const sql = `
        SELECT
            JobTransactionType,
            COUNT(*) AS TransactionCount
        FROM
            tbNewJobs
        WHERE
            JobsStatus = '2'
            AND JobTransactionType IN ('Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside')
        GROUP BY
            JobTransactionType;
      `;
  
      const results = await queryDatabase(sql);
      res.json(results);
    } catch (err) {
      throw err;
    }
  };
  
  exports.getFinishJobTransactions = async (req, res) => {
    try {
      const sql = `
        SELECT
            JobTransactionType,
            COUNT(*) AS TransactionCount
        FROM
            tbNewJobs
        WHERE
            JobsStatus = '3'
            AND JobTransactionType IN ('Inside To Inside', 'Inside To Outside', 'Outside To Inside', 'Outside To Outside')
        GROUP BY
            JobTransactionType;
      `;
  
      const results = await queryDatabase(sql);
      res.json(results);
    } catch (err) {
      throw err;
    }
  };
  