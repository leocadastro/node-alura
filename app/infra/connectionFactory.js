var mysql = require('mysql');

var createDbConnection = function() {
	if(!process.env.NODE_ENV){
		return mysql.createConnection({
			host : 'exxact-mysql.cpjslnuppeww.us-west-2.rds.amazonaws.com',
			user : 'exxactuser',
			password : 'qwer1234',
			database : 'exxactbd'
		});
	}

	if(process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
			host : 'exxact-mysql.cpjslnuppeww.us-west-2.rds.amazonaws.com',
			user : 'exxactuser',
			password : 'qwer1234',
			database : 'exxactbd_test'
		});
	}

	if(process.env.NODE_ENV == 'production'){
		return mysql.createConnection({
			host : 'exxact-mysql.cpjslnuppeww.us-west-2.rds.amazonaws.com',
			user : 'exxactuser',
			password : 'qwer1234',
			database : 'exxactbd'
		});
	}
}

module.exports = function() {
	return createDbConnection;
}
