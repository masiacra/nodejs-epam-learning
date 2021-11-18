import { NextFunction, Request, Response } from 'express';
import { QueryValidateScheme } from '../types/validation.types';

export const validateScheme =
    (schemas: QueryValidateScheme[]) =>
    (request: Request, _: Response, next: NextFunction): void => {
        for (const [key, schema] of schemas) {
            const params = request[key];

            if (params) {
                const { error } = schema.validate(params, {
                    allowUnknown: false,
                    abortEarly: false,
                });
                if (error) {
                    next(error);
                    return;
                }
            }
        }

        next();
    };
