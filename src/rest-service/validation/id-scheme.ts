import Joi from 'joi';
import { QueryValidateScheme } from '../types/validation.types';

// TODO: use guid in last homework
export const idParamsScheme = Joi.object().keys({
    // id: Joi.string().guid().required(),
    id: Joi.string().required(),
});

export const VALIDATE_ID_SCHEME_CONFIG: QueryValidateScheme[] = [
    ['params', idParamsScheme],
];
