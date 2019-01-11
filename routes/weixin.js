const express = require('express');
const router = express.Router();

/**
 * 用作给前端调用，返回给前端 wx.config 的配置信息
 */
router.get('/sign', function(req, res, next) {
  // 时间戳
  let timestamp = getTimestamp();

  // 随机字符串
  let nonceStr = getNonceStr();

  // url地址
  let url = req.query.url;
  res.send(`时间戳：${timestamp} ，随机字符串：${nonceStr}`);
})

/**
 * 获取 jsapi_ticket
 */
const getTicket = () => {

}

/**
 * 获取 access_token
 */
const getAccessToken = () => {

}

/**
 * 获取 随机字符串的方法
 * @param {Number} length 长度
 */
const getNonceStr = (length = 16) => {
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let max = chars.length - 1;
  let min = 0;
  let str = '';

  for (let i = 0; i < length; i++) {
    str += chars.substr(Math.floor(Math.random() * (max - min + 1)) + min, 1)
  }

  return str;
}

/**
 * 获取 当前时间戳的方法
 */
const getTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000)
}

module.exports = router;
