import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger.config';

export const parseEntryObject = (obj?: object): string => {
    if (!obj) {
        return '';
    }
    const output = Object.entries(obj).map(([key, value]) => {
        return `${key}=${value}`;
    });

    return output.length === 0 ? '' : `, ${output.join(', ')}`;
};

export const getLoggedFunction =
    (
        callback: (
            request: Request,
            response: Response,
            next: NextFunction,
        ) => void,
    ) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            return await callback(request, response, next);
        } catch (error) {
            const { body, query } = request;
            const entryParams = `${parseEntryObject(body)}${parseEntryObject(
                query,
            )}`;
            logger.info(
                'Function %s received %s got error with message %s at %s',
                callback.name,
                entryParams,
                (error as Error).message,
                new Date(),
            );

            next(error);
            return;
        }
    };
