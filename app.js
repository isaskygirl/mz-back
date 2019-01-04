const express = require('express');
const app = express();

const banner = require('./routes/banner');
const city = require('./routes/city');
const film = require('./routes/film');
const cinema = require('./routes/cinema');
const user = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/banner', banner);
app.use('/api/city', city);
app.use('/api/film', film);
app.use('/api/cinema', cinema);
app.use('/api/user', user);

app.listen(9090);
console.log('服务启动成功');
