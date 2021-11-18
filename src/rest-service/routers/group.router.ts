import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodesEnum } from '../types/application.types';
import {
    GROUP_CREATE_SCHEME_CONFIG,
    GROUP_UPDATE_SCHEME_CONFIG,
} from '../validation/group-scheme';
import { VALIDATE_ID_SCHEME_CONFIG } from '../validation/id-scheme';
import { validateScheme } from '../validation/validate-scheme';
import {
    findGroupService,
    createGroupService,
    updateGroupService,
    deleteGroupService,
} from '../services/groups.service';

const internalProblem = new Error('Sorry. Some propblems with server');

export const handleGetGroup = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { resultObject: group, error } = await findGroupService(id);

    if (error) {
        next(error);
        return;
    }

    if (!group) {
        response
            .status(StatusCodesEnum.NotFound)
            .json({ message: `Group with id=${id} not found` });

        return;
    }

    response.json(group);
};

const handlePostGroup = async (
    { body: { name, permissions } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { resultObject: group, error } = await createGroupService({
        name,
        permissions,
    });

    if (error) {
        next(error);
        return;
    }

    response
        .status(StatusCodesEnum.OK)
        .json({ message: 'User sucessfully added', group });
};

const handlePutGroup = async (
    { params: { id }, body: { name, permissions } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { code, error } = await updateGroupService(id, {
        name,
        permissions,
    });

    if (error) {
        next(error);
        return;
    }

    if (code) {
        response.status(StatusCodesEnum.OK).json({
            message: `Group with id=${id} sucessfully updated`,
        });
        return;
    }

    next(internalProblem);
};

const handleDeleteGroup = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { error, code } = await deleteGroupService(id);

    if (error) {
        next(error);
        return;
    }

    if (code) {
        response.json({
            message: `Group with id=${id} has been successfully deleted`,
        });
        return;
    }

    next(internalProblem);
};

export const groupRouter = Router();

groupRouter.get(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    handleGetGroup,
);
groupRouter.post(
    '/',
    validateScheme(GROUP_CREATE_SCHEME_CONFIG),
    handlePostGroup,
);
groupRouter.put(
    '/:id',
    validateScheme(GROUP_UPDATE_SCHEME_CONFIG),
    handlePutGroup,
);
groupRouter.delete(
    '/:id',
    validateScheme(VALIDATE_ID_SCHEME_CONFIG),
    handleDeleteGroup,
);
