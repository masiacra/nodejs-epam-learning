import { Model } from 'sequelize';
import { User } from './user.types';

export type UserAttributes = Omit<User, 'isDeleted'> & { is_deleted: boolean };

export interface UserInstance
    extends Model<UserAttributes, UserAttributes>,
        UserAttributes {}
