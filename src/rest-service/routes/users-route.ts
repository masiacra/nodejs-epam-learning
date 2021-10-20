import { Router, Request, Response } from 'express';
import { promisify } from 'util';
import { StatusCodes } from '../common-types';
import { dataBase } from '../models/model-database';
import { getLimit } from '../helpers/getLimit';

const promisifiedGetAutoSuggestUsers = promisify(dataBase.getAutoSuggestUsers);

export const usersRouter = Router();

const handleGetUsers = async (
    { query: { login, limit } }: Request,
    response: Response,
) => {
    if (!login) {
        response
            .status(StatusCodes.BadRequest)
            .json({ message: 'Please, send login!' });
        return;
    }

    if (typeof login !== 'string') {
        response
            .status(StatusCodes.BadRequest)
            .json({ message: 'Invalid request!' });
        return;
    }

    try {
        const users = await promisifiedGetAutoSuggestUsers(
            login,
            getLimit(limit as string),
        );

        response.json({ users });
    } catch (error) {
        console.error(error);
        response
            .status(StatusCodes.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

usersRouter.get('/', handleGetUsers);
