import { Request, Response, NextFunction } from 'express';
import { parseEntryObject } from '../helpers/logging.helpers';
import { logger } from '../config/logger.config';

export const loggingMiddleware = (
    { url, body, query, method }: Request,
    _response: Response,
    next: NextFunction,
) => {
    let message = `url=${url}, method=${method}`;
    message += parseEntryObject(query);
    message += parseEntryObject(body);

    logger.info('Received %s at %s', message, new Date());

    next();
};
