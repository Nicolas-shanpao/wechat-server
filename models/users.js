const mongoose = require("mongoose")
var db = require("../config/db")
// 用户表
var SchemaUser = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  phone: String,
  sex: {type: Number, required: true},
  age: {type: Number, required: true},
  address: String,
  password: {type: String, required: true}
})
module.exports = db.model("users", SchemaUser)
