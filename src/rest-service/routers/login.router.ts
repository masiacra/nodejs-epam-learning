import { Request, Response, NextFunction } from 'express';
import { handleGetTokenService } from '../services/login.service';
import { BAD_LOGIN_OR_PASSWORD } from '../config/application.config';

export const handlGetLogin = async (
    { query: { login, password } }: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    if (
        login &&
        typeof login === 'string' &&
        password &&
        typeof password === 'string'
    ) {
        const token = await handleGetTokenService(login, password);
        if (token) {
            response.json({ token });
            next();
            return;
        }
    }

    next(BAD_LOGIN_OR_PASSWORD);
};
