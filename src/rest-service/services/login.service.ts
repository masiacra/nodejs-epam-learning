import { sign } from 'jsonwebtoken';
import { findUserByLogin } from '../data-access/users.data-access';

export const handleGetTokenService = async (
    login: string,
    password: string,
) => {
    const user = await findUserByLogin(login);

    if (user && user.password === password && !user.isDeleted) {
        return sign({ login }, process.env.SECRET as string);
    }

    return null;
};
