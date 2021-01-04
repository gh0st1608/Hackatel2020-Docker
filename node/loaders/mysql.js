const mysql = require('mysql');
const config = require('../config/index.js');

const mysqlConnection = new Promise ((resolve,reject) => {
    mysql.createConnection({
    host: config.mysql.bd_port,
    user: config.mysql.bd_user,
    password: config.mysql.bd_pass,
    database: config.mysql.bd_name,
    multipleStatements: true
    });

    
    resolve('conexion exitosa');

});






module.exports = mysqlConnection;