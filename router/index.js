var dbserver = require('../dao/dbserver')

module.exports=function (app) {
  app.get('/test', (req, res) => {
    dbserver.findUser(res)
  })
  app.post('/addUser', (req, res) => {
    console.log(req.body);
    // dbserver.addUser(res)
    dbserver.findUser(res)

  })
}
