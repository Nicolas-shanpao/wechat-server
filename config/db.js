const mongoose = require("mongoose")
mongoose.connect('mongodb://119.23.67.3:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("数据库连接成功");
})
