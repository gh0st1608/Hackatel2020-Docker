//const fetch = require('node-fetch');
const request = require('request-promise'); 
const tokenserver = require('../config/index.js').tokenserver;
const peticionServicio = {};

//curl -H "Content-Type: application/json" -X POST "localhost:3000/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'

peticionServicio.validarMensajePorFb = (tipoRespuesta,jsonMensajeRespuesta) => {
  return new Promise((resolve,reject) => {
    switch (tipoRespuesta){
        case 1:
        request({
          uri: 'https://graph.facebook.com/v2.6/me/messages',
          qs: { access_token: tokenserver },
          method: 'POST',
          json: jsonMensajeRespuesta,
          })
          .then(json => console.log(json))
          resolve(jsonMensajeRespuesta)
          break;

        case 2:
        console.log('entro al tipo de respuesta 2');
          break;
    }
  })
}





module.exports = peticionServicio;


