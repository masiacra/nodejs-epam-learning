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
    try {
        const { resultObject: group } = await findGroupService(id);

        if (!group) {
            response
                .status(StatusCodesEnum.NotFound)
                .json({ message: `Group with id=${id} not found` });

            return;
        }

        response.json(group);
    } catch (error) {
        next(error);
        return;
    }
};

const handlePostGroup = async (
    { body: { name, permissions } }: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { resultObject: group } = await createGroupService({
            name,
            permissions,
        });

        response
            .status(StatusCodesEnum.OK)
            .json({ message: 'Group sucessfully added', group });
    } catch (error) {
        next(error);
        return;
    }
};

const handlePutGroup = async (
    { params: { id }, body: { name, permissions } }: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { code } = await updateGroupService(id, {
            name,
            permissions,
        });

        if (code) {
            response.status(StatusCodesEnum.OK).json({
                message: `Group with id=${id} sucessfully updated`,
            });
            return;
        }

        next(internalProblem);
        return;
    } catch (error) {
        next(error);
        return;
    }
};

const handleDeleteGroup = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { code } = await deleteGroupService(id);

        if (code) {
            response.json({
                message: `Group with id=${id} has been successfully deleted`,
            });
            return;
        }

        next(internalProblem);
        return;
    } catch (error) {
        next(error);
        return;
    }
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
