const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({name: String, age: Number})

module.exports = mongoose.model('users', usersSchema)
