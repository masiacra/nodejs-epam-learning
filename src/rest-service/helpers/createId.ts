import { Id } from '../types/user.types';
import { randomUUID } from 'crypto';

export const createId = (): Id => randomUUID();
