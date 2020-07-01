const Commonts = require('../models/commonts')
const auth = require("../middleware/auth")
module.exports = function (app) {
  //  新增文章
  app.post('/addArticle', async (req, res) => {
    let newArticle = {
      articleTitle: req.body.articleTitle,
      articleType: req.body.articleType,
      author_id: req.body.author_id,
      uploadDate: req.body.uploadDate,
      updateDate: req.body.updateDate,
      articleLevel: req.body.articleLevel,
      articleContent: req.body.articleContent,
      comment: req.body.comment
    };
    Commonts.create(newArticle, async (err, val) => {
      if (err) {
        console.log('文章插入失败！' + err)
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: {id: val._id},
          message: 'success'
        })
      }
    })
  })

  //  获取文章列表
  app.get('/articleList', auth, async (req, res) => {
    Commonts.find({}, function (err, val) {
      if (err) {
        console.log('文章查找失败！' + err)
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
  app.get('/getArticleDetial', auth, async (req, res) => {
    Commonts.find({_id: req.query.id}, function (err, val) {
      if (err) {
        console.log('文章查找失败！' + err)
      } else {
        res.send({
          code: 200,
          data: val[0],
          message: 'success'
        })
      }
    })
  })
}
