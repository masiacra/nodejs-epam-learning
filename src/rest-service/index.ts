import express, { Request, Response } from 'express';
import { userRouter } from './routes/user-route';
import { usersRouter } from './routes/users-route';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_: Request, response: Response) => {
    response.json({ message: 'This is the main page' });
});

app.use('/user', userRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
