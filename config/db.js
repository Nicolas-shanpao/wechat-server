const mongoose = require("mongoose")
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://admin:ACElzz2018@119.23.67.3:27017/test', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("数据库连接成功");
})
module.exports = db
