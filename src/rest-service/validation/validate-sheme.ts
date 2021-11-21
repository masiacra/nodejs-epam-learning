import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validateSheme =
    (
        paramsShema: ObjectSchema | undefined,
        bodyShema: ObjectSchema | undefined,
        queryShema?: ObjectSchema,
    ) =>
    (request: Request, _: Response, next: NextFunction): void => {
        if (paramsShema) {
            const { error: paramsError } = paramsShema.validate(
                request.params,
                {
                    allowUnknown: false,
                    abortEarly: false,
                },
            );
            if (paramsError) {
                next(paramsError);
                return;
            }
        }

        if (bodyShema) {
            const { error } = bodyShema.validate(request.body, {
                allowUnknown: false,
                abortEarly: false,
            });

            if (error) {
                next(error);
                return;
            }
        }

        if (queryShema) {
            const { error: queryError } = queryShema.validate(request.query, {
                allowUnknown: false,
                abortEarly: false,
            });
            if (queryError) {
                next(queryError);
                return;
            }
        }

        next();
    };
