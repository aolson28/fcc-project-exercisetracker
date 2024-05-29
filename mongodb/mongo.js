/* const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { url } = require('inspector');
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

const getUsers = () => {
    User.find({}).then((data) => {
        console.log(data);
        return data;
    }).catch((err) => {
        if (err) {
            console.error(err);
        }
    });
};

const addUser = (username) => {
    let newUser = new User({
        username: username,
        count: 0,
        log: []
    });    
    let res = newUser.save().then((data) => {
        return {username: data.username, _id: data.id};
    }).catch((err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log(res);
    return res;
};

const addExercise = (req, res) => {
    return;
};

const getUserLog = (req, res) => {
    let from;
    let to;
    let limit;
    return;
};

module.exports = {getUsers, addUser, addExercise, getUserLog};

*/