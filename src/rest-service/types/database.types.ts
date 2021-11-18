import { Model } from 'sequelize';
import { User } from './user.types';
import { Group } from './group.types';

export type UserAttributes = Omit<User, 'isDeleted'> & { is_deleted: boolean };

export interface UserInstance
    extends Model<UserAttributes, UserAttributes>,
        UserAttributes {}

export interface GroupInstance extends Model<Group, Group>, Group {}
