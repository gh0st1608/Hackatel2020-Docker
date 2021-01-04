const router = require('express').Router();
const auth = require('./routes/auth.js');
const bot = require('./routes/bot.js');
// guaranteed to get dependencies
module.exports = () => {
	auth(router);
	bot(router);
	
	return router
}