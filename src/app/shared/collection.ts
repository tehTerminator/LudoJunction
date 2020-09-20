export const SECOND = 1000;
export const MINUTE = 60000;
export const HOUR = 3600000;

export enum State {
    PENDING, ACCEPTED, ACTIVE, COMPLETED, REJECTED
};

export enum UserType {
    ADMINISTRATOR, PLAYER
};

export interface SqlObject{
    [key: string]: string
}

export interface SqlResponse {
    status: boolean;
    errors: Array<string>;
    message: Array<string>;
    data: Array<any>;
    token: string;
    lastInsertId: number;
}

export interface SqlRequest {
    columns?: Array<string>;
    andWhere?: { [key: string]: any };
    orWhere?: { [key: string]: any };
    orderBy?: string;
    limit?: string;
    join?: string;
    groupBy?: string;
    leftJoin?: string;
    rightJoin?: string;
    userData?: { [key: string]: string | number | boolean };
  }

export interface Challenge {
    id: number;
    sender: number;
    receiver?: number;
    amount: number;
    room?: string;
    state: State;
    postedOn: Date;
    winner?: number;
    screenshot?: string;
    stitle?: string;
    rtitle?: string;
}

