const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { connectMongoDB } = require('./mongodb/connectMongoDB.js')
const { Schema, model } = mongoose;
require('dotenv').config()
const { url } = require('inspector');
const mongoRouter = require('./mongodb/mongo.js');

app.use(cors())
app.use(express.static('public'))
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(express.urlencoded({
  limit: '10mb',
  extended: true
}));

app.use('/api', mongoRouter);


// connect to MongoDB using Mongoose in /mongodb/connectMongoDB.js
// put connection URL in .env as MONGO_URL
connectMongoDB();


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

module.exports = app;