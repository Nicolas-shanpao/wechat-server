const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const SECRET = require("../config/development")
var auth = async (req, res, next) => {
  const raw = String(req.headers.authorization).split(' ').pop();
  // 验证
  const {id} = jwt.verify(raw, SECRET)
  req.user = await Users.findById(id, {password: 0})
  next()
}
module.exports = auth
