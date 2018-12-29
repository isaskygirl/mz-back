const express = require('express');
const router = express.Router();

const banners = require('../json/banners.json');

router.get('/', (req, res, next) => {
  res.json({
    code: 0,
    msg: 'ok',
    data: banners
  })
})

module.exports = router;
