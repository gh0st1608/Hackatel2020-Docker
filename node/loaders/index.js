const expressLoader = require ('./express.js');
const componentesLoader = require('./componentes.js');
//const mysqlConn = require('./mysql.js');



module.exports = (expressApp) => {
    /*mysqlConn
    .then(info => {console.log(info)})
    .catch(info => {console.log(info)});
*/

    expressLoader(expressApp);
    //console.log('✌️ Express loaded');
}