module.exports = function(app) {

	var listaProdutos = function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			if (err) throw err;

			res.render('produtos/lista', {lista: results})
		});

		connection.end();
	}

	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', function(req, res) {
		res.render('produtos/form')
	});

	app.post('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		var produto = req.body;

		produtosDAO.salva(produto, function(err, results) {
			if (err) throw err;

			res.redirect('/produtos');
		});
	});
}
