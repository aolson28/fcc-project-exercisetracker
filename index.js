const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { connectMongoDB } = require('./mongodb/connectMongoDB.js')
const { Schema, model } = mongoose;
require('dotenv').config();
const userRoutes = require('./src/users.js');

app.use(cors())
app.use(express.static('public'))
app.use(express.json());

app.use(express.urlencoded({
  limit: '10mb',
  extended: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/users.html')
});

// route all '/api' calls to a module.
app.use('/api/users', userRoutes);


// connect to MongoDB using Mongoose in /mongodb/connectMongoDB.js
// put connection URL in .env as MONGO_URL
connectMongoDB();


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

module.exports = app;