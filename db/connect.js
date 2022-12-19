const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const connect = async (url)=>{
    return mongoose.connect(url)
}

module.exports = connect;