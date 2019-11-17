module.exports.jogo = function(application, req, res){
	if(!req.session.autorizado) {
		res.send('Usuário precisa se logar antes.')
		return;
	}

	let comando_invalido = 'N';
	if (req.query.comando_invalido === 'S') {
		comando_invalido = 'S';
	}

	const usuario = req.session.usuario;
	const casa = req.session.casa;

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
	
}

module.exports.sair = function(application, req, res) {
	req.session.destroy(function(err) {
		res.render('index', {validacao: {}});
	});
}

module.exports.suditos = function(application, req, res) {
	if(!req.session.autorizado) {
		res.send('Usuário precisa se logar antes.')
		return;
	}

	res.render('aldeoes', {validacao: {}});
}

module.exports.pergaminhos = function(application, req, res) {
	if(!req.session.autorizado) {
		res.send('Usuário precisa se logar antes.')
		return;
	}

	res.render('pergaminhos', {validacao: {}});
}

module.exports.ordenar_acao_sudito = function(application, req, res) {
	if(!req.session.autorizado) {
		res.send('Usuário precisa se logar antes.')
		return;
	}
	
	const dadosForm = req.body;

	req.assert('acao', 'Ação deve ser informada').notEmpty();
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

	const errors = req.validationErrors();

	if (errors) {
		res.redirect('jogo?comando_invalido=S');
		return;
	}

	res.send('tudo ok');
}