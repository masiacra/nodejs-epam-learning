import express, { Request, Response } from 'express';
import { userRouter } from './routes/user-route';
import { usersRouter } from './routes/users-route';
import { PORT } from './config/app.config';
import { sequelize } from './config/database.config';
import { ROUTES } from './config/routes.config';

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.get('/', (_: Request, response: Response) => {
    response.json({ message: 'This is the main page' });
});

application.use(ROUTES.user, userRouter);
application.use(ROUTES.users, usersRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log(
            'Connection with database has been established sucessfully.',
        );
        application.listen(PORT, () =>
            console.log(`server is running on port ${PORT}`),
        );
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    });

process.on('SIGTERM', () => {
    sequelize.close();
});
