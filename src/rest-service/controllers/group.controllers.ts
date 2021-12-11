import { Request, Response, NextFunction } from 'express';
import { StatusCodesEnum } from '../types/application.types';
import {
    findGroupService,
    createGroupService,
    updateGroupService,
    deleteGroupService,
    getAllGroupsService,
} from '../services/groups.service';
import { INTERNAL_PROBLEM } from '../config/application.config';

export const handleGetGroup = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { group } = await findGroupService(id);

    if (!group) {
        response
            .status(StatusCodesEnum.NotFound)
            .json({ message: `Group with id=${id} not found` });
        next();
        return;
    }

    response.json(group);
    next();
    return;
};

export const handlePostGroup = async (
    { body: { name, permissions, usersIds } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { resultObject: group } = await createGroupService({
        name,
        permissions,
        usersIds,
    });

    response
        .status(StatusCodesEnum.OK)
        .json({ message: 'Group sucessfully added', group });
    next();
    return;
};

export const handlePutGroup = async (
    { params: { id }, body: { name, permissions, usersIds } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { code } = await updateGroupService({
        usersIds,
        id,
        name,
        permissions,
    });

    if (code) {
        response.status(StatusCodesEnum.OK).json({
            message: `Group with id=${id} sucessfully updated`,
        });
        return;
    }

    next(INTERNAL_PROBLEM);
    return;
};

export const handleDeleteGroup = async (
    { params: { id } }: Request,
    response: Response,
    next: NextFunction,
) => {
    const { code } = await deleteGroupService(id);

    if (code) {
        response.json({
            message: `Group with id=${id} has been successfully deleted`,
        });
        next();
        return;
    }

    next(INTERNAL_PROBLEM);
    return;
};

export const handleGetGroups = async (
    _: Request,
    response: Response,
    next: NextFunction,
) => {
    const { groups } = await getAllGroupsService();

    response.json(groups);
    next();
    return;
};
