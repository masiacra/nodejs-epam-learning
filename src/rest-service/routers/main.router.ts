import { Request, Response } from 'express';

export const handleGetMainPage = (_: Request, response: Response) => {
    response.json({ message: 'This is the main page' });
};
