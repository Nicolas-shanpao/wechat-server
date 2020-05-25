const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const SECRET = require("../config/development")
var auth = async (req, res, next) => {
  const token = String(req.headers.authorization).split(' ').pop();
  // 验证
  if (token) {
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        return res.json({success: false, message: '无效的token.'});
      } else {
        // 如果验证通过，在req中写入解密结果
        const {id} = decoded
        req.user = await Users.findById(id, {password: 0})
        next(); //继续下一步路由
      }

    })
  } else {
    // 没有拿到token 返回错误
    return res.status(403).send({
      success: false,
      message: '没有找到token.'
    });
  }
}
module.exports = auth
