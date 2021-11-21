import { UserGroupInstance } from '../types/database.types';
import { sequelize } from '../config/database.config';
import { DataTypes } from 'sequelize';
import { Users } from './user.models';
import { Groups } from './groups.models';

export const UserGroup = sequelize.define<UserGroupInstance>(
    'users_groups',
    {
        user_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            },
        },
        group_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            references: {
                model: Groups,
                key: 'id',
            },
        },
    },
    { tableName: 'users_groups' },
);

Users.belongsToMany(Groups, { through: UserGroup, foreignKey: 'user_id' });
Groups.belongsToMany(Users, { through: UserGroup, foreignKey: 'group_id' });
