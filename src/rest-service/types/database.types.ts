import { Model } from 'sequelize';
import { User } from './user.types';
import { Group } from './group.types';
import { Id } from './common.types';

export type UserAttributes = Omit<User, 'isDeleted'> & { is_deleted: boolean };

export interface UserInstance
    extends Model<UserAttributes, UserAttributes>,
        UserAttributes {}

export interface GroupInstance extends Model<Group, Group>, Group {}

interface UserGroup {
    user_id: Id;
    group_id: Id;
}

export interface UserGroupInstance
    extends Model<UserGroup, UserGroup>,
        UserGroup {}
