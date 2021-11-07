import Joi from 'joi';
import { MAX_AGE, MIN_AGE, PASSWORD_REGEX } from '../config/validation.config';

export const userCreateSheme = Joi.object().keys({
    login: Joi.string().required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
});

export const userUpdateSheme = Joi.object()
    .keys({
        login: Joi.string().optional(),
        age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
        password: Joi.string().regex(PASSWORD_REGEX).optional(),
    })
    .or('age', 'login', 'password');

export const idParamsSheme = Joi.object().keys({
    id: Joi.string().guid().required(),
});
