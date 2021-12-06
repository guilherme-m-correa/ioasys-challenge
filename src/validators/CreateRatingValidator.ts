import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    movieId: Joi.string().required(),
    score: Joi.number().integer().min(0).max(4).required(),
  },
});
