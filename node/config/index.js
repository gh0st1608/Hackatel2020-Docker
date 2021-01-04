require('dotenv').config({
  path:'.env'
});

module.exports = {
  tokenosip: process.env.TOKEN_FB_OSIP,
  tokenserver: process.env.TOKEN_FB_SERVER,
  port: process.env.APP_PORT,
  mysql: {
    bd_user: process.env.BD_USER,
    bd_pass: process.env.BD_PASS,
    bd_host: process.env.BD_HOST,
    bd_name: process.env.BD_NAME,
    bd_port: process.env.BD_PORT
  }
  /*
  api: {
    prefix: '/api',
  },*/
}