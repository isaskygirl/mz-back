// 用户模型
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  "userName": {
    type: String,
    required: true
  },
  "userPwd": {
    type: String,
    required: true
  },
  "nickName": {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
