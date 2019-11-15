module.exports.jogo = function(application, req, res){
	if(!req.session.autorizado) {
		res.send('Usuário precisa se logar antes.')
		return;
	}

	const usuario = req.session.usuario;
	const casa = req.session.casa;

	const connection = application.config.dbConnection;
	const JogoDAO = new application.app.models.JogoDAO(connection);

	JogoDAO.iniciaJogo(res, usuario, casa);
	
}

module.exports.sair = function(application, req, res) {
	req.session.destroy(function(err) {
		res.sender('index', {validacao: {}});
	});
}