import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
    FAILED_TO_AUTHENTICATE,
    NO_TOKEN_PROVIDED,
} from '../config/application.config';

export const loginMiddleware = async (
    { headers }: Request,
    _: Response,
    next: NextFunction,
) => {
    const token = headers['x-access-token'];
    if (!token || typeof token !== 'string') {
        next(NO_TOKEN_PROVIDED);
        return;
    }

    try {
        await jwt.verify(token, process.env.SECRET as string);
    } catch (error) {
        next(FAILED_TO_AUTHENTICATE);
        return;
    }

    next();
};
