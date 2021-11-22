import { GroupInstance } from '../types/database.types';
import { Permission } from '../types/group.types';
import { sequelize } from '../config/database.config';
import { DataTypes } from 'sequelize';

export const Groups = sequelize.define<GroupInstance>(
    'groups',
    {
        id: { type: DataTypes.STRING(100), allowNull: false, primaryKey: true },
        name: { type: DataTypes.STRING(30), allowNull: false },
        permissions: {
            type: DataTypes.ENUM(
                Permission.DELETE,
                Permission.READ,
                Permission.SHARE,
                Permission.UPLOAD_FILES,
                Permission.WRITE,
            ),
            allowNull: true,
        },
    },
    { tableName: 'groups' },
);
