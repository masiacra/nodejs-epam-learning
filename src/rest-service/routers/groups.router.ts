import { Router, Request, Response, NextFunction } from 'express';
import { getAllGroupsService } from '../services/groups.service';

const handleGetGroups = async (
    _: Request,
    response: Response,
    next: NextFunction,
) => {
    const { groups, error } = await getAllGroupsService();

    if (error) {
        next(error);
        return;
    }

    response.json(groups);
};

export const groupsRouter = Router();

groupsRouter.get('/', handleGetGroups);
