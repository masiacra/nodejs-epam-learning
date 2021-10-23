import Joi from 'joi';

export const userCreateSheme = Joi.object().keys({
    login: Joi.string().required(),
    age: Joi.number().integer().min(4).max(130).required(),
    password: Joi.string()
        .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .required(),
});

export const userUpdateSheme = Joi.object()
    .keys({
        login: Joi.string().optional(),
        age: Joi.number().integer().min(4).max(130).optional(),
        password: Joi.string()
            .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
            .optional(),
    })
    .or('age', 'login', 'password');
