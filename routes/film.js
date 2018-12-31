const express = require('express');
const router = express.Router();

const films = require('../json/films.json');

router.get('/', (req, res, next) => {
  let pageNum = parseInt(req.query.pageNum) || 1;     // 当前页码
  let pageSize = parseInt(req.query.pageSize) || 10;  // 每页显示条数
  let type = parseInt(req.query.type) || 1;           // 影片类型 1->正在热映 2-> 即将上映
  let typeTotal = 0;                  // 对应分类的总条数
  let nowDate = new Date().getTime(); // 当前时间

  let filterFilms = films.filter(item => {
    if (type === 1) {
      // 正在热映，影片上映时间 小于 当前时间
      return item.premiereAt * 1000 < nowDate;
    } else {
      // 即将上映，影片上映时间 大于等于 当前时间
      return item.premiereAt * 1000 >= nowDate;
    }
  });

  // 得到总条数
  typeTotal = filterFilms.length;
  /*
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    计算分页条数
    Math.ceil(typeTotal / pageSize)
    第一页
    filterFilms.slice(0, 10)
    第二页
    filterFilms.slice(10, 20)
    第三页
    filterFilms.slice(20, 30)
    ...
    规律
    filterFilms.slice((pageNum - 1) * pageSize, pageNum * pageSize);
  */

  res.send({
    code: 0,
    msg: 'ok',
    data: {
      films: filterFilms.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: typeTotal
    }
  });
})

module.exports = router;
