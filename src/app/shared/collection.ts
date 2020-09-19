export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;

export enum State {
    PENDING, ACTIVE, COMPLETED, REJECTED
};

export enum Result {
    WIN, LOSS
};

export enum UserType {
    ADMINISTRATOR, PLAYER
};

export interface SqlResponse {
    status: boolean;
    errors: Array<string>;
    message: Array<string>;
    data: Array<any>;
    token: string;
    lastInsertId: number;
}

export interface GameRequest {
    id: number;
    sender: number;
    receiver?: number;
    amount: number;
    room?: string;
    state: State;
    postedOn: Date;
    result?: Result;
    screenshot?: string;
    title?: string;
}