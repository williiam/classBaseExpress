import { Response } from 'express';

export interface IResponse extends Response {
    error?: boolean|string;
    errors?: Array<any>;
    message?: string;
    accessToken?: string;
    data?: any;
}
