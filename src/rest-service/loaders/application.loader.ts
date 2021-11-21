import express, { Application, Request, Response } from 'express';
import { userRouter } from '../routers/user.router';
import { usersRouter } from '../routers/users.router';
import { ROUTES } from '../config/routes.config';
import { errorHandleMiddleware } from '../error-handling/error-handle.middleware';

export const improveApplication = (application: Application): void => {
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

    application.get(ROUTES.main, (_: Request, response: Response) => {
        response.json({ message: 'This is the main page' });
    });

    application.use(ROUTES.user, userRouter);
    application.use(ROUTES.users, usersRouter);
    application.use(errorHandleMiddleware);
};
