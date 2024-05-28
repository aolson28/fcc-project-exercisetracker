const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { connectMongoDB } = require('./mongodb/connectMongoDB.js')
const { Schema, model } = mongoose;
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// connect to MongoDB using Mongoose in /mongodb/connectMongoDB.js
// put connection URL in .env as MONGO_URL
connectMongoDB();



app.post('/api/users', (req, res) => {
  // do stuff
  return;
});

app.post('/api/users/:_id/exercises', (req, res) => {
  // do stuff
  return;
});

app.get('/api/users', (req, res) => {
  // do stuff
  return;
});

app.get('/api/users/:_id/logs?[from][&to][&limit]', (req, res) => {
  // do stuff
  return;
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
