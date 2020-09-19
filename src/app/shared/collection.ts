export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;
export const ADMINISTRATOR = 'ADMINISTRATOR';
export const PLAYER = 'PLAYER';

export interface SqlResponse {
    errors: Array<string>;
    message: Array<string>;
    status: boolean;
    data: Array<any>;
}