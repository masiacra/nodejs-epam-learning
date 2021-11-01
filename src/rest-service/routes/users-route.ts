import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { StatusCodesEnum } from '../types/common-types';
import { getLimit } from '../helpers/getLimit';
import { userMapper } from '../mappers/user.mapper';
import { Users } from '../config/database.config';

export const usersRouter = Router();

const handleGetUsers = async (
    { query: { login, limit } }: Request,
    response: Response,
) => {
    if (!login) {
        response
            .status(StatusCodesEnum.BadRequest)
            .json({ message: 'Please, send login!' });
        return;
    }

    if (typeof login !== 'string') {
        response
            .status(StatusCodesEnum.BadRequest)
            .json({ message: 'Invalid request!' });
        return;
    }

    try {
        const users = await Users.findAll({
            where: { login: { [Op.startsWith]: login } },
            limit: getLimit(limit as string),
        });

        response.json({ users: users.map(userMapper) });
    } catch (error) {
        console.error(error);
        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

usersRouter.get('/', handleGetUsers);
