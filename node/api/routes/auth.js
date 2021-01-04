
const tokenserver = require('../../config/index.js').tokenserver;
const express = require('express');
const route = express.Router();

//curl -X GET "localhost:3000/webhook?hub.verify_token=<YOUR_VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

module.exports = (app) => {
  app.use('/', route);
  route.get('/webhook',(req, res) => {
    console.log('entro a validarConexion API');
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    console.log(token);
    console.log(mode);
    if (mode === 'subscribe' && token === tokenserver) {
      res.status(200).send(challenge);
      console.log('acepto la peticion http');
    }else{
      console.log('rechazo la peticion http');
      res.status(500)
    }
    res.end();
  });

  route.get('/cuerosjc',(req, res) => {
      res.status(200).send('exito');
      console.log('exito en la peticion http');
  });

}
