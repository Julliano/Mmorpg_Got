module.exports.jogo = function(application, req, res){
	if(req.session.autorizado) {
		res.render('jogo', {img_casa: req.session.casa});
	} else {
		res.send('Usuário precisa se logar antes.')
	}
	
}