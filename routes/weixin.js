const express = require('express');
const https = require('https');
const fs = require('fs');

const wxConfig = require('../config/wx.config');
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


  let token = getAccessToken(wxConfig.appId, wxConfig.appSecret);



  res.send(`时间戳：${timestamp} ，随机字符串：${nonceStr}, token: ${token}`);
})

/**
 * 获取 jsapi_ticket
 */
const getTicket = () => {

}

/**
 * 获取 access_token
 */
const getAccessToken = (appId, appSecret) => {
  let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

  // 读取文件
  let tokenObj = JSON.parse(fs.readFileSync(wxConfig.tokenPath, 'utf-8'));

  // 判断是否过期
  if (tokenObj['expires_time'] > getTimestamp()) {
    // 未过期
    console.log('token未过期');
    return tokenObj['access_token'];
  } else {
    // 过期了
    console.log('token过期了');
    https.get(url, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      })
      res.on('end', () => {
        // 得到数据，需要给保存起来。
        let data = JSON.parse(rawData);
        data['expires_time'] = getTimestamp() + 7000;

        // 写入到 json/access_token.json 文件中。
        fs.writeFileSync(wxConfig.tokenPath, JSON.stringify(data));
        return 1
      })
    })

    return 2
  }
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
