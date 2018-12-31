const express = require('express');
const app = express();

const banner = require('./routes/banner');
const city = require('./routes/city');
const film = require('./routes/film');
const cinema = require('./routes/cinema');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/banner', banner);
app.use('/city', city);
app.use('/film', film);
app.use('/cinema', cinema);

app.listen(9090);
console.log('服务启动成功');
