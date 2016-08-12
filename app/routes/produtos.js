module.exports = function(app) {
	app.get('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();

		connection.query('select * from Livros', function(err, results) {
			if (err) throw err;
			
			res.render('produtos/lista', {lista: results})
		});

		connection.end();
	});
}
