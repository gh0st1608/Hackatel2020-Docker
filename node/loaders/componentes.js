const request = require('request-promise');
const tokenserver = require('../config/index.js').tokenserver;



var yourNumber = "+51923928966"
var yourMessage = "Tengo una consulta sobre el bloqueo de mi equipo terminal"
function getLinkWhastapp(yourNumber, yourMessage) {
  var url = 'https://api.whatsapp.com/send?phone=' 
     + yourNumber 
     + '&text=' 
     + encodeURIComponent(yourMessage)

  return url
}

//JSON

var jsonEmpezar = {
    "get_started":{
      "payload":"1"
    }
}

var jsonMenuPersistente = {
  //"psid": "3759961577378312",
  "persistent_menu": [
      {
          "locale": "default",
          "composer_input_disabled": false,
          "call_to_actions": [
              {
                "type": "web_url",
                "title": "📞 Consulta por Whatsapp",
                "url": getLinkWhastapp(yourNumber,yourMessage),
                "webview_height_ratio": "full"
              },
              {
                "type": "postback",
                "title": "🍲 Consulta por Color",
                "payload": "2"
              },
              {
                "type": "postback",
                "title": "👨‍👩‍👦 Consulta por Tipo",
                "payload": "3"
              }
          ]
      }
  ]
}


//boton empezar
    request({
      url: "https://graph.facebook.com/v9.0/me/messenger_profile?access_token=" + tokenserver,
      method: "POST",
      json: true,   // <--Very important!!!
      body: jsonEmpezar
    })
    .then(json => console.log(json));
    //console.log(jsonEmpezar);



//menu persistente NIVEL DE PAGINA
    request({
          url: "https://graph.facebook.com/v9.0/me/messenger_profile?access_token=" + tokenserver,
          method: "POST",
          json: true,   // <--Very important!!!
          body: jsonMenuPersistente
    })
    .then(json => console.log(json));
    //console.log(jsonMenuPersistente);






//console.log(urlWSP);




