const express = require('express');
const router = express.Router();

const cinemas = require('../json/cinemas.json');

// 获取影院列表，根据城市id
router.get('/', (req, res, next) => {
  let cityId = parseInt(req.query.cityId);

  let filterCinemas = cinemas.filter(item => {
    return item.cityId === cityId;
  });

  res.json({
    code: 0,
    msg: 'ok',
    data: {
      cinemas: filterCinemas
    }
  })
});

// 影院搜索
router.post('/search', (req, res, next) => {
  let searchVal = req.body.name;

  let filterCinemas = cinemas.filter(item => {
    return item.name.indexOf(searchVal) > -1;
  });

  res.json({
    code: 0,
    msg: 'ok',
    data: {
      cinemas: filterCinemas
    }
  })
});


module.exports = router;
