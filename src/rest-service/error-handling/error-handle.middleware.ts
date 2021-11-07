import { Request, Response, NextFunction } from 'express';
import { ValidationErrorItem, ValidationError } from 'joi';
import { UniqueConstraintError } from 'sequelize';
import { StatusCodesEnum } from '../types/application.types';

const getErrorResponseObject = (shemaErrors: ValidationErrorItem[]) => {
    const errors = shemaErrors.map((error) => ({
        message: error.message,
    }));

    return {
        status: 'failed',
        errors,
    };
};

export const errorHandleMiddleware = (
    error: Error,
    _: Request,
    response: Response,
    next: NextFunction,
) => {
    if (response.headersSent) {
        return next(error);
    }

    if (error instanceof ValidationError && error.isJoi) {
        response
            .status(StatusCodesEnum.BadRequest)
            .json(getErrorResponseObject(error.details));

        return;
    }

    if (error instanceof UniqueConstraintError) {
        response
            .status(StatusCodesEnum.Conflict)
            .json({ message: 'User with appropriate id is already exists' });

        return;
    }

    response
        .status(StatusCodesEnum.InternalServerError)
        .json({ message: 'Sorry, some problems with server' });
};
