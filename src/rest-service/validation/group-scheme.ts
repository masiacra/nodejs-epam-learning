import Joi from 'joi';
import { Permission } from '../types/group.types';
import { QueryValidateScheme } from '../types/validation.types';
import { VALIDATE_ID_SCHEME_CONFIG } from './id-scheme';

export const groupCreateScheme = Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array()
        .items(
            Joi.string().valid(
                Permission.DELETE,
                Permission.READ,
                Permission.SHARE,
                Permission.UPLOAD_FILES,
                Permission.WRITE,
            ),
        )
        .required(),
    usersIds: Joi.array().items(Joi.string()).optional(),
});

export const groupUpdateScheme = Joi.object()
    .keys({
        name: Joi.string().optional(),
        permissions: Joi.array()
            .items(
                Joi.string().valid(
                    Permission.DELETE,
                    Permission.READ,
                    Permission.SHARE,
                    Permission.UPLOAD_FILES,
                    Permission.WRITE,
                ),
            )
            .optional(),
        usersIds: Joi.array().items(Joi.string()).optional(),
    })
    .or('name', 'permissions');

export const GROUP_CREATE_SCHEME_CONFIG: QueryValidateScheme[] = [
    ['body', groupCreateScheme],
];

export const GROUP_UPDATE_SCHEME_CONFIG: QueryValidateScheme[] = [
    ...VALIDATE_ID_SCHEME_CONFIG,
    ['body', groupUpdateScheme],
];
