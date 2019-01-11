const path = require('path');

module.exports = {
  appId: 'wx9551c38135f5192e',
  appSecret: '3bd2edc541561c5716c87b89d790d435',

  tokenPath: path.resolve(__dirname, '../json/access_token.json'),
  ticketPath: path.resolve(__dirname, '../json/jsapi_ticket.json')
}
