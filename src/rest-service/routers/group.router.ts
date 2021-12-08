import { Router } from 'express';
import {
    GROUP_CREATE_SCHEME_CONFIG,
    GROUP_UPDATE_SCHEME_CONFIG,
} from '../validation/group-scheme';
import { VALIDATE_ID_SCHEME_CONFIG } from '../validation/id-scheme';
import { validateScheme } from '../validation/validate-scheme';
import {
    handleDeleteGroup,
    handleGetGroup,
    handleGetGroups,
    handlePostGroup,
    handlePutGroup,
} from '../controllers/group.controllers';
import { getLoggedFunction } from '../helpers/logging.helpers';

export const groupRouter = Router();

groupRouter.get('/', getLoggedFunction(handleGetGroups));
groupRouter.get(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    getLoggedFunction(handleGetGroup),
);
groupRouter.post(
    '/',
    validateScheme(GROUP_CREATE_SCHEME_CONFIG),
    getLoggedFunction(handlePostGroup),
);
groupRouter.put(
    '/:id',
    validateScheme(GROUP_UPDATE_SCHEME_CONFIG),
    getLoggedFunction(handlePutGroup),
);
groupRouter.delete(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    getLoggedFunction(handleDeleteGroup),
);
