module.exports = function(app) {

	var listaProdutos = function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			if (err) throw err;

			res.format({
				html: function() {
					res.render('produtos/lista', {lista: results});
				},
				json: function() {
					res.json(results);
				}
			});
		});

		connection.end();
	}

	app.get('/produtos', listaProdutos);

	app.get('/produtos/create', function(req, res) {
		res.render('produtos/create')
	});

	app.post('/produtos/create', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		var produto = req.body;

		produtosDAO.salva(produto, function(err, results) {
			if (err) throw err;

			res.redirect('/produtos');
		});
	});
}
