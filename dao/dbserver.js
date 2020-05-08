var dbmodel = require("../model/dbmodel")
var User = dbmodel.model('users')
exports.findUser = function (res) {
  User.find({},{},function (err, val) {
    if (err) {
      console.log('用户数据查找失败！' + err)
    } else {
      res.send(val)
    }
  })
}
exports.addUser = function (req,res) {
  console.log(req);
  User.insert({},function (err, val) {
    if (err) {
      console.log('用户数据查找失败！' + err)
    } else {
      res.send(val)
    }
  })
}
