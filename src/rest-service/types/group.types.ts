import { Id } from './common.types';

export enum Permission {
    READ = 'READ',
    WRITE = 'WRITE',
    DELETE = 'DELETE',
    SHARE = 'SHARE',
    UPLOAD_FILES = 'UPLOAD_FILES',
}

export interface Group {
    id: Id;
    name: string;
    permissions: Permission[];
}

export type PartialGroup = Partial<Group>;
