export class User{
    private id: number;
    private _token: string;
    public title: string;
    public username: string;
    public generatedOn: number;

    constructor(
        title: string,
        username: string,
        token: string,
        generatedOn: number
    ) {
        this.id = 0;
        this.title = title;
        this.username = username;
        this._token = token;
        this.generatedOn = generatedOn;
    }

    get token(): string {
        const now = (new Date()).getTime();
        if (now > this.generatedOn ){
            return this._token;
        } else {
            return null;
        }
    }
}

export class Player extends User {
    public balance: number;

    constructor(
        title: string,
        username: string,
        token: string,
        generatedOn: number,
        balance: number
    ) {
        super(title, username, token, generatedOn);
        this.balance = balance;
    }
}