import Joi from 'joi';
import { MAX_AGE, MIN_AGE, PASSWORD_REGEX } from '../config/validation.config';
import { QueryValidateScheme } from '../types/validation.types';
import { VALIDATE_ID_SCHEME_CONFIG } from './id-scheme';

export const userCreateScheme = Joi.object().keys({
    login: Joi.string().required(),
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
});

export const userUpdateScheme = Joi.object()
    .keys({
        login: Joi.string().optional(),
        age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
        password: Joi.string().regex(PASSWORD_REGEX).optional(),
    })
    .or('age', 'login', 'password');

export const usersScheme = Joi.object().keys({
    login: Joi.string().required(),
    limit: Joi.number(),
});

export const USER_VALIDATE_SCHEME_CONFIG: QueryValidateScheme[] = [
    ['query', usersScheme],
];

export const USER_CREATE_SCHEME_CONFIG: QueryValidateScheme[] = [
    ['body', userCreateScheme],
];

export const USER_UPDATE_SCHEME_CONFIG: QueryValidateScheme[] = [
    ...VALIDATE_ID_SCHEME_CONFIG,
    ['body', userUpdateScheme],
];
