const express = require('express')
const app = express()
const port = 3333
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get('/', (req, res) => res.send('你好世界!'))
app.post('/sss', (req, res) => {
  console.log(req.body);
  res.send('你好世界!')
})
require("./router/index")(app)
// 404页面
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
})
// 出现错误处理
app.use(function (req, res, next) {
  res.status(err.status || 500)
  res.send(err.message);
})
app.listen(port, () => console.log(`您已启动端口： ${port}!`))
