const mongoose = require("mongoose")
var db = require("../config/db")
// 文章表
//   <!--标题 类型 作者 上传时间 最后一次修改时间 难度 内容 评论 -->

var SchemaCommonts = new mongoose.Schema({
  articleTitle: {
    type: String,
    required: true,
  },
  articleType: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
  updateDate: {
    type: String,
    required: true,
  },
  articleLevel: {
    type: String,
    required: true,
  },
  articleContent: {
    type: String,
  },
  comment: {
    type: String,
  }
})
module.exports = db.model("commonts", SchemaCommonts)
