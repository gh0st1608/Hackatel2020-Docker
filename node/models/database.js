const mysql = require('mysql');
const config = require('../config/index.js');

class Database {
	constructor() {
		this.connection = mysql.createConnection({
			host: config.mysql.bd_host,
			user: config.mysql.bd_user,
			password: config.mysql.bd_pass,
			database: config.mysql.bd_name,
			multipleStatements: true
		});	
	}

	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
    }
}
module.exports = new Database();
