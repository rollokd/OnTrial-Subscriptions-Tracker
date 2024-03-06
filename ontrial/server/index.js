require('./scheduledTasks/subscriptionChecker')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const subscriptionRoutes = require('./router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', subscriptionRoutes);

const dbConnection = 'mongodb://localhost:27017/Subscriptions'; 

//MongoDB connection 
mongoose.connect(dbConnection)
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const port = 3000
app.listen(port, ()=>{
 console.log(`Server running on port ${port}`)
})
