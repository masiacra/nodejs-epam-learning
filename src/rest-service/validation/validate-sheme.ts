import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationErrorItem } from 'joi';
import { StatusCodesEnum } from '../types/common-types';

const getErrorResponseObject = (shemaErrors: ValidationErrorItem[]) => {
    const errors = shemaErrors.map((error) => ({
        message: error.message,
    }));

    return {
        status: 'failed',
        errors,
    };
};

export const validateSheme =
    (shema: ObjectSchema) =>
    (request: Request, response: Response, next: NextFunction): void => {
        const { error } = shema.validate(request.body, {
            allowUnknown: false,
            abortEarly: false,
        });

        if (error && error.isJoi) {
            response
                .status(StatusCodesEnum.BadRequest)
                .json(getErrorResponseObject(error.details));
        } else {
            next();
            return;
        }
    };
