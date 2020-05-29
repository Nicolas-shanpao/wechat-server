const mongoose = require("mongoose")
var db = require("../config/db")
// 用户表
var SchemaUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true //字段是否唯一
  },
  nikename: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: String,
  sex: {
    type: Number,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    set(val) {
      // 通过bcrypt对密码加密返回值 第一个值返回值， 第二个密码强度
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
module.exports = db.model("users", SchemaUser)
