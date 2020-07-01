import sql from "../config/controller";
const auth = require("../middleware/auth")
const jwt = require('jsonwebtoken')
const SECRET = require("../config/development")
module.exports = function (app) {
  //  获取用户列表
  app.get('/userListssss', auth, async (req, res) => {
    let data = await sql.findTable('user');
    console.log(data);
  })
}
