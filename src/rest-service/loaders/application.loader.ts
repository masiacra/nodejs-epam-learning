import express, { Application } from 'express';
import { userRouter } from '../routers/user.router';
import { groupRouter } from '../routers/group.router';
import { handleGetMainPage } from '../routers/main.router';
import { ROUTES } from '../config/routes.config';
import { errorHandleMiddleware } from '../middlewares/error-handle.middleware';
import { loggingMiddleware } from '../middlewares/logging.middleware';
import { handlGetLogin } from '../routers/login.router';

export const improveApplication = (application: Application): void => {
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));
    application.use(loggingMiddleware);

    application.get(ROUTES.main, handleGetMainPage);
    application.get(ROUTES.login, handlGetLogin);
    application.use(ROUTES.users, userRouter);
    application.use(ROUTES.groups, groupRouter);

    application.use(errorHandleMiddleware);
};
