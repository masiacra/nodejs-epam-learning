import { Router, Request, Response, NextFunction } from 'express';
import { getAllGroupsService } from '../services/groups.service';

const handleGetGroups = async (
    _: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const { groups } = await getAllGroupsService();

        response.json(groups);
    } catch (error) {
        next(error);
        return;
    }
};

export const groupsRouter = Router();

groupsRouter.get('/', handleGetGroups);
