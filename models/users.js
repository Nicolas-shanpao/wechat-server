const mongoose = require("mongoose")
var db = require("../config/db")
// 用户表
var SchemaUser = new mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
  address: String,
  password: String
})
module.exports = db.model("users", SchemaUser)
