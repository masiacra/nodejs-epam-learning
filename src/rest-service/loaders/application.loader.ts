import express, { Application } from 'express';
import { userRouter } from '../routers/user.router';
import { groupRouter } from '../routers/group.router';
import { handleGetMainPage } from '../routers/main.router';
import { ROUTES } from '../config/routes.config';
import { errorHandleMiddleware } from '../middlewares/error-handle.middleware';
import { loggingMiddleware } from '../middlewares/logging.middleware';

export const improveApplication = (application: Application): void => {
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));
    application.use(loggingMiddleware);

    application.get(ROUTES.main, handleGetMainPage);
    application.use(ROUTES.user, userRouter);
    application.use(ROUTES.group, groupRouter);

    application.use(errorHandleMiddleware);
};
