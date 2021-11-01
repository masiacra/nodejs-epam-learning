import { Router, Request, Response } from 'express';
import { StatusCodesEnum } from '../types/common-types';
import { UniqueConstraintError } from 'sequelize';
import { updateUser, deleteUser } from '../models/model-user';
import { userCreateSheme, userUpdateSheme } from '../validation/user-sheme';
import { validateSheme } from '../validation/validate-sheme';
import { Users } from '../config/database.config';
import { userMapper } from '../mappers/user.mapper';
import { createId } from '../helpers/createId';

const handleGetUser = async (
    { params: { id } }: Request,
    response: Response,
) => {
    try {
        const user = await Users.findByPk(id);

        if (!user) {
            response
                .status(StatusCodesEnum.NotFound)
                .json({ message: `User with id=${id} not found` });
            return;
        }

        response.json(userMapper(user));
    } catch (error) {
        console.error(error);
        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

const handlePostUser = async (
    { body: { login, password, age } }: Request,
    response: Response,
) => {
    try {
        const user = await Users.create({
            id: createId(),
            login,
            password,
            age,
            is_deleted: false,
        });

        response
            .status(StatusCodesEnum.OK)
            .json({ message: 'User sucessfully added', user });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            response
                .status(StatusCodesEnum.Conflict)
                .json({ message: (error as Error).message });
            return;
        }
        console.error(error);
        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

const handlePutUser = async (
    { params: { id }, body: { login, password, age } }: Request,
    response: Response,
) => {
    if (!id) {
        response
            .status(StatusCodesEnum.NotAcceptable)
            .json({ message: 'Please, send user id' });
        return;
    }
    try {
        const oldUser = await Users.findByPk(id);

        if (!oldUser) {
            response.status(StatusCodesEnum.NotFound).json({
                message: `Sorry we can't find user with id ${id}`,
            });
            return;
        }

        const [resultOfOperation] = await Users.update(
            { login, password, age },
            { where: { id } },
        );

        if (resultOfOperation === 1) {
            response.status(StatusCodesEnum.OK).json({
                message: 'User sucessfully updated',
                user: updateUser(userMapper(oldUser), login, password, age),
            });
            return;
        }

        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    } catch (error) {
        console.error(error);
        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

const handleDeleteUser = async (
    { params: { id } }: Request,
    response: Response,
) => {
    if (!id) {
        response
            .status(StatusCodesEnum.NotAcceptable)
            .json({ message: 'Please, send user id' });
        return;
    }

    try {
        const user = await Users.findByPk(id);
        if (!user) {
            response.status(StatusCodesEnum.NotFound).json({
                message: `Sorry we can't find user with id ${id}`,
            });
            return;
        }
        const [resultOfOperation] = await Users.update(
            { is_deleted: true },
            { where: { id } },
        );

        if (resultOfOperation === 1) {
            response.json({
                message: 'User has been successfully deleted',
                user: deleteUser(userMapper(user)),
            });
            return;
        }

        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    } catch (error) {
        console.error(error);
        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

export const userRouter = Router();
userRouter.get('/:id', handleGetUser);
userRouter.post('/', validateSheme(userCreateSheme), handlePostUser);
userRouter.put('/:id', validateSheme(userUpdateSheme), handlePutUser);
userRouter.delete('/:id', handleDeleteUser);
