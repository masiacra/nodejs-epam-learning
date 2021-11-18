import { Id } from './common.types';

export interface User {
    id: Id;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
