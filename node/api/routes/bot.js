
const express = require('express');
const MensajeServicio = require('../../services/mensaje.js');
const PeticionServicio = require('../../services/peticion.js');
const route = express.Router();
//console.log('ruta post del bot');

module.exports = (app) => {
  app.use('/', route);
  route.post('/webhook',(req, res) => {
    MensajeServicio.CrearMensaje(req.body)
    .then(Mensaje => {
    console.log('--objeto mensaje--')
    console.log(Mensaje);
    console.log('-----')
    MensajeServicio.ValidarTextoMensaje(Mensaje)
    .then(TextoMensajeValidado=> {
    console.log('--objeto mensaje Validado---');
    console.log(TextoMensajeValidado);
    console.log('-----');
    MensajeServicio.GenerarTextoRespuesta(Mensaje)
    .then(Mensaje => {
    console.log('-obtener Mensaje con Respuesta-')
    console.log(Mensaje);
    console.log('-----');
    MensajeServicio.SeleccionarTipoRespuestaJson(Mensaje)
    .then(JsonMensaje => {
    console.log('-obtenerTextoRespuesta-')
    console.log(JsonMensaje);
    console.log('-----')
    PeticionServicio.validarMensajePorFb(Mensaje.tipoRespuesta,JsonMensaje)
    .then(MensajeEnviado => {
    console.log('-obtenerMensajeFinal-')
    console.log(MensajeEnviado);
    console.log('-----')
    MensajeServicio.LimpiarMensaje(Mensaje)
    .then(MensajeLimpio => {
    console.log('--Mensaje limpio-')
    console.log(MensajeLimpio);
    console.log('--------')
                        })
                    })
                })  
            })
        })
    })  
    res.sendStatus(200);   
  })
}
