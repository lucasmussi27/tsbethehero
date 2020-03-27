import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ongController from "./controllers/ongController";
import incidentController from "./controllers/incidentController";

const routes = Router();

// Ong Routes
routes.get('/ongs', ongController.findAll);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(11),
    country: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), ongController.create);

// Incident Routes
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), incidentController.findAll);

routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), incidentController.create);

routes.delete('/incidents', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), incidentController.delete);

export default routes;