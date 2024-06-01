var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { url } = require('inspector');

const userSchema = new Schema(
    {
        username: String
    }
  );
  
const exerciseSchema = new Schema(
{
    username: String,
    description: String,
    duration: Number,
    date: Date,
    userId: String
}
);

const User = model('User', userSchema);
const Exercise = model('Exercise', exerciseSchema);

router.post('/', (req, res) => {
console.log(req);
let newUser = new User({
    username: req.body.username
});    
newUser.save().then((data) => {
    res.json({username: data.username, _id: data.id});
}).catch((err) => {
    if (err) {
        console.error(err);
    }
});
});

router.post('/:_id/exercises', (req, res) => {
User.findById(req.params._id).then((data) => {
    let activityDate = req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString();
    let newExercise = new Exercise({username: data.username, description: req.body.description, duration: Number(req.body.duration), date: activityDate, userId: data.id});
    newExercise.save().then((data) => {return;}).catch((err) => {if (err) {console.error(err);}});
    res.json({username: data.username, description: req.body.description, duration: Number(req.body.duration), date: activityDate, _id: data.id});
}).catch((err) => {
    if(err) {
    console.error(err)
    }});
});

router.get('/', (req, res) => {
User.find({}).then((data) => {
    res.send(data.map((item) => {return {username: item.username, _id: item.id};}));
}).catch((err) => {
    if (err) {
        console.error(err);
    }
});
});

router.get('/:_id/logs?:from?/:to?/:limit?', (req, res) => {
    User.findById(req.params._id).then((data) => {
    let logQuery = Exercise.find({userId: data.id});
    if (req.query.from) {
        logQuery = logQuery.where('date').gte(req.query.from);
    } else {}
    if (req.query.to) {
        logQuery = logQuery.where('date').lte(req.query.to);
    } else {}
    if (req.query.limit) {
        logQuery = logQuery.limit(req.query.limit);
    } else {}
    logQuery.select('description duration date').then((logData) => {
        res.json({
        username: data.username,
        count: logData.length,
        _id: data.id,
        log: [...logData.map((item) => {return {description: item.description, duration: item.duration, date: item.date.toDateString()}})]
        })
    }).catch((err) => {if (err) {console.error(err);}})
    }).catch((err) => {if (err) {console.error(err);}});
});

module.exports = router;