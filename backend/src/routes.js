const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');
 
const PerfilController = require('./controllers/PerfilController');
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), CasosController.index);


routes.post('/casos', CasosController.create);
routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), CasosController.delete);

routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), PerfilController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;