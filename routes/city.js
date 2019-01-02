const express = require('express');
const router = express.Router();

const citys = require('../json/citys.json');

router.get('/', (req, res, next) => {
  res.json({
    code: 0,
    msg: 'ok',
    data: {
      cities: citys
    }
  })
})

module.exports = router;
