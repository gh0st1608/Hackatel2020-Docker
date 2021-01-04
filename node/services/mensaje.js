const MensajeModel = require('../models/mensaje');
const random = require('random')
const bd = require('../models/bd.js'); 
const MensajeServicio = {};

MensajeServicio.CrearMensaje = function(evento){
  console.log(evento);
  var tipoEvento = Object.keys(evento.entry[0].messaging[0])[3];
  MensajeModel.tipoEvento = tipoEvento;
  evento.entry.forEach(function (objEntry){
    MensajeModel.entryID = objEntry.id; 
          objEntry.messaging.forEach(function(objMessaging){
            MensajeModel.entryID = objEntry.id;
            MensajeModel.senderID = objMessaging.sender.id;
            MensajeModel.recipientID = objMessaging.recipient.id;
              switch (tipoEvento){
                case 'message':
                  MensajeModel.textoInicial = objMessaging.message.text;
                  MensajeModel.tipoIntencion = 1;
                  MensajeModel.estado = 1;
                  //objMensaje.tipoIntencion = 2;
                  //objMensaje.tipoRespuesta = 2;
                  break;
                case 'postback':
                  MensajeModel.postTitle = objMessaging.postback.title;
                  MensajeModel.postPayload = objMessaging.postback.payload;
                  MensajeModel.tipoIntencion = 2;
                  MensajeModel.estado = 1;
                  //objMensaje.tipoIntencion = 1; // 1 intencion mostrar lista del mp - 2 intencion mostrar de objetos template - 3 intencion Conversar
                  //objMensaje.tipoRespuesta = 1; // 1 respuesta tipo texto - 2 mensaje tipo template
                  break;
              }
    })
  })
  return new Promise((resolve,reject)=>{
    resolve(MensajeModel)
  })
}

MensajeServicio.ValidarTextoMensaje = function (MensajeModel){
  console.log('validar');
    return new Promise((resolve,reject)=>{
      console.log(MensajeModel.postPayload);
        if (MensajeModel.textoInicial === ''){
                console.log('campo texto inicial vacio');
                MensajeModel.estado = 1
                resolve(MensajeModel);

        }

        if (MensajeModel.postPayload === '') {
                console.log('campo postapyload vacio');
                MensajeModel.estado = 2;
                resolve(MensajeModel);   
        }  

        if (typeof MensajeModel.textoInicial === 'undefined') {
                console.log('campo texto inicial indefinido');
                MensajeModel.tipoIntencion = 2; //Activo el menu
                MensajeModel.estado = 2;
                resolve(MensajeModel);
        }

        if(typeof MensajeModel.postPayload === 'undefined'){
                console.log('campo postpayload no definido');
                MensajeModel.tipoIntencion = 1; //escribio un mensaje sin presionar boton
                MensajeModel.estado = 2;
                //MensajeModel.estado = 2;
                resolve(MensajeModel);
        }
  })
}

MensajeServicio.GenerarTextoRespuesta = function(MensajeModel){
  strRespuesta = '';
  return new Promise ((resolve,reject) => {
    switch (MensajeModel.tipoIntencion){
      case 1:
        console.log('Escribio en el chat');
          var numrandom = random.int(min = 1, max = 3);
          MensajeModel.estado = numrandom;
          console.log('EL numero random es ' + numrandom);

          if(numrandom == 1){
          console.log('entro al if ' + numrandom);
          MensajeModel.tipoRespuesta = 1;
          MensajeModel.textoRespuesta = 'Solcitud con estado Favorable' ;
          resolve(MensajeModel);
          break;
          }

          if(numrandom == 2){
          console.log('entro al if ' + numrandom);
          MensajeModel.tipoRespuesta = 1;
          MensajeModel.textoRespuesta = 'Solcitud con estado Desfavorable' ;
          resolve(MensajeModel);
          break;
          }

          if(numrandom == 3){
            console.log('entro al if' + numrandom);
            MensajeModel.tipoRespuesta = 1;
            MensajeModel.textoRespuesta = 'Solcitud sin Estado Actual' ;
            resolve(MensajeModel);
            break;
          }
        
      case 2: // escogio en el menu
        console.log('Escogio las opciones del menu');
        console.log('EL codigo postpayload es' + MensajeModel.postPayload);
        if (MensajeModel.postPayload == '1'){
          console.log('Activo Boton Empezar');
          MensajeModel.tipoRespuesta = 1
          MensajeModel.textoRespuesta = 'Bienvenido a Osiptel por Primera Vez, escoga uno de los botones para atender su consulta' ;
          resolve(MensajeModel);
          break;  
        }

        if (MensajeModel.postPayload == '2'){
          console.log('Boton de consulta por imei');
          MensajeModel.tipoRespuesta = 1
          MensajeModel.textoRespuesta = 'Ingrese codigo de IMEI'; 
          resolve(MensajeModel);
          break;  
        }

        if (MensajeModel.postPayload == '3'){
          console.log('Boton de consulta por datos personales');
          MensajeModel.tipoRespuesta = 1
          MensajeModel.textoRespuesta = 'Ingrese dni';
          resolve(MensajeModel);
          break;  
        }

      }     
    }) 
}

MensajeServicio.SeleccionarTipoRespuestaJson = function(MensajeModel){
return new Promise((resolve,reject)=>{
  switch(MensajeModel.tipoRespuesta){
      case 1:
        var mensajeSimple = {
          recipient: {
            id: MensajeModel.senderID,
          },
          message: {
            text: MensajeModel.textoRespuesta,
          },
        };
        console.log(MensajeModel.textoRespuesta)  
        resolve(mensajeSimple);
        break;

      case 2:
        var mensajeTemplate = {
              recipient : {
                id: MensajeModel.senderID
              },
              message: {
                attachment: {
                  type: "template",
                  payload: {
                    template_type: "generic",
                    elements: mensajeRespuesta
              }
            }
          }
        };
        resolve(mensajeTemplate);
        break;
    }
  })
};



MensajeServicio.LimpiarMensaje = function(MensajeModel){
  //var tipoEvento = Object.keys(evento.entry[0].messaging[0])[3];
    MensajeModel.tipoEvento = '';
    MensajeModel.entryID = '';
    MensajeModel.senderID = '';
    MensajeModel.recipientID = '';
    MensajeModel.textoInicial = '';
    MensajeModel.postTitle = '';
    MensajeModel.tipoIntencion = '';
    MensajeModel.tipoRespuesta = '';
    MensajeModel.textoRespuesta = '';
    MensajeModel.postPayload = '';
    MensajeModel.estado = '';

  return new Promise((resolve,reject)=>{
    resolve(MensajeModel)
  })
}

module.exports = MensajeServicio;