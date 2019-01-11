const express = require('express');
const app = express();

const banner = require('./routes/banner');
const city = require('./routes/city');
const film = require('./routes/film');
const cinema = require('./routes/cinema');
// const user = require('./routes/user');
const user = require('./routes/user2');
const weixin = require('./routes/weixin');

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  next();
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/banner', banner);
app.use('/api/city', city);
app.use('/api/film', film);
app.use('/api/cinema', cinema);
app.use('/api/user', user);
app.use('/api/weixin', weixin);

app.listen(80);
console.log('服务启动成功');
