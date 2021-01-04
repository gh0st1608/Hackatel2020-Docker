const database = require('./database.js');
const bd = {};



bd.ConsultarPorDni = function(dni) {
    var sqlObtenerEstadoPorDni = 'SELECT resultado_atencion FROM TablaConsultaOsiptel'; // WHERE documento = ' + dni;
    return new Promise((resolve, reject) => {
        console.log('Antes de realizar la query');
        database.query(sqlObtenerEstadoPorDni)
        .then(data => {
            console.log(data);
            resolve(data);
        })
    })
}


module.exports = bd;