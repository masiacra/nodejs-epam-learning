export type Id = string;

export interface User {
    id: Id;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
