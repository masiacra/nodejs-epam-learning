import { Id } from '../common-types';
import { randomUUID } from 'crypto';

export const createId = (): Id => randomUUID();
