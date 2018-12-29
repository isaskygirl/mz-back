const express = require('express');
const app = express();

const banner = require('./routes/banner');
const city = require('./routes/city');

app.use('/banner', banner);
app.use('/city', city);

app.listen(9090);
console.log('服务启动成功');
