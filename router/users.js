const Users = require('../models/Users')
const request = require('request')
const md5 = require('js-md5')
module.exports = function (app) {
  //  获取用户列表
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
  //
  app.get('/findUser', (req, res) => {
    Users.find({}, {password: 0}, function (err, val) {
      if (err) {
        console.log('用户数据查找失败！' + err)
      } else {
        res.send(val)
      }
    })
  })
  //  新增用户
  app.post('/addUser', (req, res) => {
    console.log(req.body);
    Users.findOne({name: req.body.name}, {}, function (err, val) {
      if (err) {
        console.log('用户数据查找失败！' + err)
      } else {
        if (!val) {
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
              res.send({
                code: 401,
                data: err,
                message: 'error'
              })
            } else {
              res.send({
                code: 200,
                data: val,
                message: 'success'
              })
            }
          })
        } else {
          res.send({
            code: 2001,
            data: "",
            message: '用户名已存在',
            type: 'warning',
          })
        }
      }
    })

  })
  // javaAPI
  app.post('/javaAPI', (req, res) => {
    console.log(req);
    request('http://bim.checc.com.cn/baisha/bimelements/v1/api/ybgclc/getAllTreeList', (error, response, body) => {
      // console.log('error:', error); // 返回错误信息
      // console.log('statusCode:', response && response.statusCode); // 返回请求的状态码
      // console.log('body:', body); // 返回回来的数据
      console.log(JSON.parse(body));
      let data = JSON.parse(body)
      res.send({
        code: 200,
        data: [data.content],
        message: 'success'
      })
    })
  })
}
