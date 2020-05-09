const Users = require('../models/Users')
const md5 = require('js-md5')
module.exports = function (app) {
  app.get('/userList', (req, res) => {
    Users.find({}, {password: 0}, function (err, val) {
      if (err) {
        console.log('用户数据查找失败！' + err)
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  })
  app.get('/findUser', (req, res) => {
    Users.find({}, {password: 0}, function (err, val) {
      if (err) {
        console.log('用户数据查找失败！' + err)
      } else {
        res.send(val)
      }
    })
  })
  app.post('/addUser', (req, res) => {
    console.log(req.body);
    let newUser = {
      name: req.body.name,
      sex: req.body.sex,
      age: Number(req.body.age),
      address: req.body.address,
      password: md5(req.body.password + '')
    };
    Users.create(newUser, function (err, val) {
      if (err) {
        console.log('用户插入失败！' + err)
      } else {
        res.send(val)
      }
    })
  })
}
