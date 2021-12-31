import { Router } from 'express';
import {
    USER_CREATE_SCHEME_CONFIG,
    USER_UPDATE_SCHEME_CONFIG,
    USER_VALIDATE_SCHEME_CONFIG,
} from '../validation/user-scheme';
import { VALIDATE_ID_SCHEME_CONFIG } from '../validation/id-scheme';
import { validateScheme } from '../validation/validate-scheme';
import {
    handleGetUser,
    handleDeleteUser,
    handleGetUsers,
    handlePostUser,
    handlePutUser,
} from '../controllers/user.controllers';
import { getLoggedFunction } from '../helpers/logging.helpers';
import { loginMiddleware } from '../middlewares/login.middleware';

export const userRouter = Router();

userRouter.use(loginMiddleware);

userRouter.get(
    '/',
    validateScheme(USER_VALIDATE_SCHEME_CONFIG),
    getLoggedFunction(handleGetUsers),
);
userRouter.get(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    getLoggedFunction(handleGetUser),
);
userRouter.post(
    '/',
    validateScheme(USER_CREATE_SCHEME_CONFIG),
    getLoggedFunction(handlePostUser),
);
userRouter.put(
    '/:id',
    validateScheme(USER_UPDATE_SCHEME_CONFIG),
    getLoggedFunction(handlePutUser),
);
userRouter.delete(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    getLoggedFunction(handleDeleteUser),
);
