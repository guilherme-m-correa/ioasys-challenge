import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    duration: Joi.number().required(),
    releaseDate: Joi.date().required(),
    description: Joi.string().required(),
    directorId: Joi.string().required(),
    writersIds: Joi.array().items(Joi.string()).required(),
    actorsIds: Joi.array().items(Joi.string()).required(),
    genresIds: Joi.array().items(Joi.string()).required(),
  },
});
