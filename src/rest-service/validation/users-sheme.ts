import Joi from 'joi';

export const usersSheme = Joi.object().keys({
    login: Joi.string().required(),
    limit: Joi.number(),
});
