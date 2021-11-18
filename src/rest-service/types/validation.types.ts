import { ObjectSchema } from 'joi';

export type RequestParams = 'params' | 'query' | 'body';

export type QueryValidateScheme = [RequestParams, ObjectSchema];
