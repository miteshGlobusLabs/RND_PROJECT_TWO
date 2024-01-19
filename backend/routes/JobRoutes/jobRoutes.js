
// Import necessary modules

const express = require('express');
const router = express.Router();



const jobsController = require('../../controllers/NewJobControllers/jobsController');
const closeController = require('../../controllers/NewJobControllers/closeCountController')
const planCountController = require('../../controllers/NewJobControllers/planCountController')
const finishCountController = require('../../controllers/NewJobControllers/finishCountController')
const allCountControllers = require('../../controllers/NewJobControllers/allCountControllers')


router.post('/', jobsController.createJob);
router.get('/', jobsController.getAllJobs);


router.get('/last-job-no', jobsController.getLastJobNo);


// // Define the route to retrieve jobs where job status is 1
// router.get('/jobStatusOne', jobsController.getJobsByStatus.bind(null, 1));

// // Define the route to retrieve jobs where job status is 2
// router.get('/jobStatusTwo', jobsController.getJobsByStatus.bind(null, 2));

// // Define the route to retrieve jobs where job status is 3
// router.get('/jobStatusThree', jobsController.getJobsByStatus.bind(null, 3));
router.get('/jobStatusOne', jobsController.getJobStatusOne);
router.get('/jobStatusTwo', jobsController.getJobStatusTwo);
router.get('/jobStatusThree', jobsController.getJobStatusThree);

// Define the route to retrieve a job by JobNo
router.get('/:JobNo', jobsController.getJobByJobNo);


// updated code use edit button
router.put('/:JobNo', jobsController.updateJobByJobNo);



// Define the route to update a job to plan status
router.put('/update/:JobNo', jobsController.updateJobStatusToPlan);

// Define the route to update a job to closed status
router.put('/closed/:JobNo', jobsController.updateJobStatusToClosed);

router.delete('/:JobNo', jobsController.deleteJobByJobNo );




router.get('/close/insidetoinside', closeController.getCountInsideToInside);
router.get('/close/insidetoutside', closeController.getCountInsideToOutside);
router.get('/close/outsidetoinside', closeController.getCountOutsideToInside);
router.get('/close/outsideToutside', closeController.getCountOutsideToOutside);






router.get('/plan/insidetoinside', planCountController.getCountInsideToInside);
router.get('/plan/insidetoutside', planCountController.getCountInsideToOutside);
router.get('/plan/outsidetoinside', planCountController.getCountOutsideToInside);
router.get('/plan/outsideToutside', planCountController.getCountOutsideToOutside);





router.get('/finish/insidetoinside', finishCountController.getCountInsideToInside);
router.get('/finish/insidetoutside', finishCountController.getCountInsideToOutside);
router.get('/finish/outsidetoinside', finishCountController.getCountOutsideToInside);
router.get('/finish/outsideToutside', finishCountController.getCountOutsideToOutside);




router.get('/plan/jobTransactions', allCountControllers.getPlanJobTransactions);
router.get('/closed/jobTransactions', allCountControllers.getClosedJobTransactions);
router.get('/finish/jobTransactions', allCountControllers.getFinishJobTransactions);





// Export the router
module.exports = router;










































