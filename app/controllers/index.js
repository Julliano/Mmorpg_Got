module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
	
	const formData = req.body;

	req.assert('usuario', 'User cannot be empty').notEmpty();
	req.assert('senha', 'Password cannot be empty').notEmpty();

	const errors = req.validationErrors();

	if (errors) {
		res.render('index', {validacao: errors});
		return;
	}

	const connection = application.config.dbConnection;
	const UserDAO = new application.app.models.UsuariosDAO(connection);

	UserDAO.autenticar(formData, req, res);

}