module.exports = function(app) {

	var listaProdutos = function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			if (err) throw err;

			res.format({
				html: function() {
					res.render('promocoes/create', {lista: results});
				},
				json: function() {
					res.json(results);
				}
			});
		});

		connection.end();
	}

	app.get('/promocoes/create', listaProdutos);


}
