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

	var criaProduto = function(req, res, erros) {
		res.format({
			html: function() {
				res.status(400).render('produtos/create', {errosValidacao: erros, produto: req.body});
			},
			json: function() {
				res.status(400).json(erros);
			}
		});
	}

	app.get('/produtos', listaProdutos);

	app.get('/produtos/create', function(req, res) {
		res.render('produtos/create', {errosValidacao:{}, produto:{}})
	});

	app.post('/produtos/create', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		var produto = req.body;

		req.assert('titulo', 'Título obrigatório').notEmpty();
		req.assert('preco', 'Formato inválido').isFloat();

		var erros = req.validationErrors();
		if(erros){
			criaProduto(req, res, erros);
			//res.render('produtos/create', {errosValidacao: erros, produto: produto});
			return;
		}

		produtosDAO.salva(produto, function(err, results) {
			if (err) throw err;

			res.redirect('/produtos');
		});
	});
}
