const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    userName:{
        type:String
    },
    password:{
        type:String
    },
    turn:{
        type:String
    },
    msg:{
        type:String
    },
    tags:{
        type:[]
    },
    cardData:{
        type:[]
    },
    isWinner:{
        type:String
    },
    winnerValue:{
        type:String
    }
})


module.exports = new mongoose.model('user',userSchema);