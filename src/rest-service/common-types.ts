export type Id = string;

export interface User {
    id: Id;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export enum StatusCodes {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    NotAcceptable = 406,
    Conflict = 409,
    InternalServerError = 500,
}
