import Joi from 'joi';
import { QueryValidateScheme } from '../types/validation.types';

export const usersScheme = Joi.object().keys({
    login: Joi.string().required(),
    limit: Joi.number(),
});

export const USER_VALIDATE_SCHEME_CONFIG: QueryValidateScheme[] = [
    ['query', usersScheme],
];
