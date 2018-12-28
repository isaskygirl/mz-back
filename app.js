const express = require('express');
const app = express();

const banner = require('./routes/banner');

app.use('/banner', banner);

app.listen(9090);
console.log('服务启动成功');
