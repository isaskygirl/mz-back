const express = require('express');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const fs = require('fs');
const path = require('path');
const update = multer({
  dest: 'C:/tmp'
})
const router = express.Router();

router.post('/updateImg', update.single('img'), (req, res, next) => {
  // 正常流程是用户只有登录之后才能上传头像，
  // 我这边假设用户已经登录并且用户的 id 是 5c2f2b1c35633936c09b238c

  // 步骤： 怎么使用上传图片
  // 1. 需要使用到一个 模块， multer
  // res.send(req.file);
  // 得到文件信息了。需要做一个转存
  let newFileName = new Date().getTime() + '_' + req.file.originalname;
  let newPath = path.resolve(__dirname, '../public/', newFileName);

  try {
    var data = fs.readFileSync(req.file.path);
    fs.writeFileSync(newPath, data);

    // 连接数据库
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      if (err) {
        console.log('连接数据库失败');
        res.send({
          code: -1,
          msg: '修改失败'
        })
        return;
      }
      var db = client.db('mz');

      db.collection('users').updateOne({_id: ObjectId('5c2f2b1c35633936c09b238c')}, {
        $set: {'userImg': newFileName}
      }, function(err) {
        if (err) {
          console.log('修改失败' + err);
          res.send({
            code: -1,
            msg: '修改失败'
          })
        } else {
          res.send({
            code: 0,
            msg: '修改成功'
          })
        }
        client.close();
      })
    })
    // res.send('转存成功');
  } catch (error) {
    res.send('明天见');
  }
})

module.exports = router;
