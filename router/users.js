const Users = require('../models/Users')
const request = require('request')
const md5 = require('js-md5')

module.exports = function (app) {
  // 校验中间件
  const auth = async (req, res) => {
    const raw = String(req.headers.authorization).split(' ').pop();
    // 验证
    const {id} = jwt.verify(raw, SECRET)
    req.user = await Users.findById(id)
  }
  //  获取用户列表
  app.get('/userList', auth, (req, res) => {
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
  app.get('/findUser', auth, (req, res) => {
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
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            age: Number(req.body.age),
            sex: req.body.sex,
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
                data: {username: val.username},
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

  // 登录
  app.post('/login', async (req, res) => {
    console.log(req.body);
    const user = await Users.findOne({
      username: req.body.username
    })
    if (!user) {
      return res.status(422).send({
        message: "用户不存在"
      })
    }

    const isPasswordValid = require('bcryptjs').compareSync(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) {
      return res.status(422).send({
        message: "密码无效"
      })
    }
    const token = jwt.sign({
      id: String(user._id)
    }, SECRET)

    // 生成token
    res.send({
      user,
      token
    })
  })
}
