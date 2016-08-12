var mysql = require('mysql');

function createDbConnection() {
	return mysql.createConnection({
		host : 'exxact-mysql.cpjslnuppeww.us-west-2.rds.amazonaws.com',
		user : 'exxactuser',
		password : 'qwer1234',
		database : 'exxactbd'
	});
}

module.exports = function() {
	return createDbConnection;
}
