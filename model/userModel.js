// const mongoose = require('mongoose');
//const Schema = mongoose.Schema

//Destructure
const { Schema, model } = require('mongoose');


//creating a data structure for a user model

const UserSchema = new Schema({
    // name: String,
    // email: String,
    // age: Number,
    // isHungry: Boolean,
    // menu

    name: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 5
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
age: {
    type: Number,
    minLength: [8, 'Must be at least 8, got {VALUE}'],
    max: 50
},
isHungry: Boolean

}, {timestamps: true});

//To declare a model
const User = model('User', UserSchema);

module.exports = User;