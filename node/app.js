
const port = require('./config/index.js').port; 
const express = require('express');

function startServer() {
    const app = express();
    //console.log('lee app');
    
    const loaders = require('./loaders'); //forma sincrona
    loaders(app);
    
    app.listen(port, () => {
        //console.log('escucha el puerto 3000');
    })
    .on('error', err => {
        process.exit(1);
    })


}


startServer();

