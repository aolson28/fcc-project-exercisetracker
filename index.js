const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const { connectMongoDB } = require('./mongodb/connectMongoDB.js')
const { Schema, model } = mongoose;
require('dotenv').config()
const { url } = require('inspector');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(express.urlencoded({
  limit: '10mb',
  extended: true
}));

// connect to MongoDB using Mongoose in /mongodb/connectMongoDB.js
// put connection URL in .env as MONGO_URL
connectMongoDB();

const userSchema = new Schema(
  {
      username: String,
      count: Number,
      log: [{description: String, duration: Number, date: Date}]
  }
);

const exerciseSchema = new Schema(
  {
      username: String,
      description: String,
      duration: Number,
      date: Date
  }
);

const User = model('User', userSchema);
const Exercise = model('Exercise', exerciseSchema);

app.post('/api/users', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    count: 0,
    log: []
  });    
  newUser.save().then((data) => {
      res.json({username: data.username, _id: data.id});
  }).catch((err) => {
      if (err) {
          console.error(err);
      }
  });
});

app.post('/api/users/:_id/exercises', (req, res) => {
  let userID = req.params._id;
  User.findById(userID).exec().then((data) => {
    let activityDate = req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString();
    User.updateOne({id: data.id}, {count: (data.count + 1)}).then(() => {}).catch((err) => {if (err) {console.error(err);}});
    User.updateOne({id: data.id}, {$push: {log: {description: req.body.description, duration: Number(req.body.duration), date: activityDate}}}).then(() => {}).catch((err) => {if (err) { console.error(err);}});
    res.json({username: data.username, description: req.body.description, duration: Number(req.body.duration), date: activityDate, _id: data.id});
  }).catch((err) => {
    if(err) {
      console.error(err)
    }});
});

app.get('/api/users', (req, res) => {
  User.find({},).then((data) => {
    res.send(data.map((item) => {return {username: item.username, _id: item.id};}));
}).catch((err) => {
    if (err) {
        console.error(err);
    }
});
});

app.get('/api/users/:_id/logs?[from][&to][&limit]', (req, res) => {
  console.log(req);
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
