import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate"
import ongController from "./controllers/ongController";
import incidentController from "./controllers/incidentController";
import profileController from "./controllers/profileController";
import sessionController from "./controllers/sessionController";

const routes = Router()
/**
 * ONGs Routes
 */
routes.get('/ongs', ongController.findAll)

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    whatsapp: Joi.string().required().min(10),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), ongController.create)
/**
 * Profiles Routes
 */
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), profileController.findAll)
/**
 * Session Routes
 */
routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
}), sessionController.create)
/**
 * Incidents Routes
 */
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), incidentController.findAll)

routes.post('/incidents', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), incidentController.create)

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), incidentController.delete)

export default routes