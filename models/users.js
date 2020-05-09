const mongoose = require("mongoose")
var db = require("../config/db")
// 用户表
var SchemaUser = new mongoose.Schema({
  name: {type: String, required: true},
  sex: {type: Number, required: true},
  age: {type: Number, required: true},
  address: String,
  password: String
})
module.exports = db.model("users", SchemaUser)
