const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const SECRET = require("../config/development")
var auth = async (req, res, next) => {
  if (req.headers.authorization) {
    const raw = String(req.headers.authorization).split(' ').pop();
    let id
    // 验证
    jwt.verify(raw, SECRET, (err, payload) => {
      if (err) return res.send({
        code: 401,
        data: 'token认证错误,请重新登录',
        message: 'error'
      })
      console.log(payload.id);
      id = {_id: payload.id}
    })
    req.user = await Users.findById(id, {password: 0})
    req.userid = id._id
    next()
  } else {
    res.send({
      code: 401,
      data: '请登录系统',
      message: 'error'
    })
  }
}
module.exports = auth
