const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mz', { useNewUrlParser: true });
const userModel = require('../models/userModel');

/**
 * 用户登录
 * @url : /api/user/login
 * @type : POST
 * @params : {
 *    userName: String,
 *    userPwd: String
 * }
 */
router.post('/login', (req, res, next) => {
  let params = req.body;

  userModel.findOne(params, (err, user) => {
    if (err) {
      res.json({
        code: -1,
        msg: err.message
      })
    } else if (!user) {
      res.json({
        code: -1,
        msg: '用户名或密码错误'
      })
    } else {
      res.json({
        code: 0,
        msg: '登录成功'
      })
    }
  })
});

module.exports = router;
