import { Router, Request, Response } from 'express';
import { promisify } from 'util';
import { StatusCodesEnum } from '../common-types';
import { dataBase, userAlreadyExistsError } from '../models/model-database';
import { createUser, updateUser, deleteUser } from '../models/model-user';

const promisifiedFindUserById = promisify(dataBase.findUserById);
const promisifiedAddUser = promisify(dataBase.addUser);
const promisifiedUpdateInDb = promisify(dataBase.updateUserInDb);
const promisifiedRemoveUser = promisify(dataBase.removeUser);

const handleGetUser = async (
    { params: { id } }: Request,
    response: Response,
) => {
    try {
        const user = await promisifiedFindUserById(id);

        if (!user) {
            response
                .status(StatusCodesEnum.NotFound)
                .json({ message: `User with id=${id} not found` });
            return;
        }

        response.json(user);
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
    if (!login || !password || !age) {
        response
            .status(StatusCodesEnum.NotAcceptable)
            .json({ message: 'Incorrect login or password or age!' });
        return;
    }
    const user = createUser(login, password, age);

    try {
        await promisifiedAddUser(user);
        response
            .status(StatusCodesEnum.OK)
            .json({ message: 'User sucessfully added' });
    } catch (error) {
        if (error === userAlreadyExistsError) {
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
        const oldUser = await promisifiedFindUserById(id);
        if (!oldUser) {
            response.status(StatusCodesEnum.NotFound).json({
                message: `Sorry we can't find user with id ${id}`,
            });
            return;
        }
        const newUser = updateUser(oldUser, login, password, age);

        await promisifiedUpdateInDb(newUser, login);

        response
            .status(StatusCodesEnum.OK)
            .json({ message: 'User sucessfully updated' });
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
        const user = await promisifiedFindUserById(id);
        if (!user) {
            response.status(StatusCodesEnum.NotFound).json({
                message: `Sorry we can't find user with id ${id}`,
            });
            return;
        }
        const deletedUser = deleteUser(user);

        await promisifiedRemoveUser(deletedUser);

        response.json({ message: 'User has been successfully deleted' });
    } catch (error) {
        console.error(error);
        response
            .status(StatusCodesEnum.InternalServerError)
            .json({ message: 'Sorry. Some problems with server' });
    }
};

export const userRouter = Router();
userRouter.get('/:id', handleGetUser);
userRouter.post('/', handlePostUser);
userRouter.put('/:id', handlePutUser);
userRouter.delete('/:id', handleDeleteUser);
