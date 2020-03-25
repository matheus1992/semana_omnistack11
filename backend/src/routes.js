const express = require('express');
const PerfilController = require('./controllers/PerfilController');
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/casos', CasosController.index);
routes.post('/casos', CasosController.create);
routes.delete('/casos/:id', CasosController.delete);

routes.get('/perfil', PerfilController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;