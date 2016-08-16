var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function() {

	beforeEach(function(done) {
		//pesquisar node-database-cleaner
		var conn = express.infra.connectionFactory();
		conn.query("delete from livros", function(err, result) {
			if (!err) {
				done();
			}
		});
	});

	it('#listagem json', function(done) {
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('#listagem html', function(done) {
		request.get('/produtos')
		//.set('Accept', 'application/json')
		.expect('Content-Type', /html/)
		.expect(200, done);
	});

	it('#cadastro produto invalido', function(done) {
		request.post('/produtos/create')
		.send({titulo: "", descricao: "novo livro"})
		.expect(400, done)
	});

	it('#cadastro produto valido', function(done) {
		request.post('/produtos/create')
		.send({titulo: "novo titulo", descricao: "novo livro", preco: 20.50})
		.expect(302, done)
	});
});
