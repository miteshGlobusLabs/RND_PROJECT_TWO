// // index.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');


// const userRoutes = require('./routes/AuthRoutes/userRoutes')
// const customerRoutes = require('./routes/CustomerRoutes/customerRoutes');
// const jobRoutes = require('./routes/JobRoutes/jobRoutes');

// const logistics = require('./routes/PlanRoutes/logistics');
// const mhe = require('./routes/PlanRoutes/mhe');
// const manPowerRoutes = require('./routes/PlanRoutes/manPowerRoutes');
// const specialPackageRoutes = require('./routes/PlanRoutes/specialPackageRoutes');

// const workOrderRoutes = require('./routes/MasterRoutes/workOrderRoutes')
// const transporterRoutes = require('./routes/MasterRoutes/transporterRoutes')
// const vehicleDetailsRoutes = require('./routes/MasterRoutes/vehicleDetailsRoutes')






// const app = express();
// const port = process.env.PORT || 3306;

// app.use(cookieParser());
// // app.use(cors());
//  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// // user routes
// app.use('/api/user', userRoutes);

// // Use customer routes
// app.use('/api/customers', customerRoutes);

// // Use job routes
// app.use('/api/new_jobs', jobRoutes);


// // Use logictics routes
// app.use('/api/logistics', logistics);


// //use MHE Routes

// app.use('/api/mhe', mhe);


// // use manPower routes
// app.use('/api/manPower', manPowerRoutes);



// // use specialpackage routes
// app.use('/api/special', specialPackageRoutes);

// //use workOrderRoutes 
// app.use('/api/workOrder', workOrderRoutes );


//  app.use('/api/transport', transporterRoutes );

//  app.use('/api/vehicle', vehicleDetailsRoutes );

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });







const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const userRoutes = require('./routes/AuthRoutes/userRoutes');
const customerRoutes = require('./routes/CustomerRoutes/customerRoutes');
const jobRoutes = require('./routes/JobRoutes/jobRoutes');
const logistics = require('./routes/PlanRoutes/logistics');
const mhe = require('./routes/PlanRoutes/mhe');
const manPowerRoutes = require('./routes/PlanRoutes/manPowerRoutes');
const specialPackageRoutes = require('./routes/PlanRoutes/specialPackageRoutes');
const workOrderRoutes = require('./routes/MasterRoutes/workOrderRoutes');
const transporterRoutes = require('./routes/MasterRoutes/transporterRoutes');
const vehicleDetailsRoutes = require('./routes/MasterRoutes/vehicleDetailsRoutes');

const app = express();
const port = process.env.PORT || 3306;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Other routes
app.use('/api/user', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/new_jobs', jobRoutes);
app.use('/api/logistics', logistics);
app.use('/api/mhe', mhe);
app.use('/api/manPower', manPowerRoutes);
app.use('/api/special', specialPackageRoutes);
app.use('/api/workOrder', workOrderRoutes);
app.use('/api/transport', transporterRoutes);
app.use('/api/vehicle', vehicleDetailsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
