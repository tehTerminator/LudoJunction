export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;
export const ADMINISTRATOR = 'ADMINISTRATOR';
export const PLAYER = 'PLAYER';

export interface SqlResponse<T> {
    errors: Array<string>;
    log: Array<string>;
    status: boolean;
    data: Array<T>
}