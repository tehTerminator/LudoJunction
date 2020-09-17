export class User{
    private id: number;
    private _type: string;
    private _token: string;
    public title: string;
    public username: string;
    public generatedOn: number;

    constructor(
        title: string,
        username: string,
        token: string,
        generatedOn: number,
		type: string
    ) {
        this.id = 0;
        this.title = title;
        this.username = username;
	this._type = type;
        this._token = token;
        this.generatedOn = generatedOn;
    }

    get token(): string {
        const minTime = (new Date()).getTime() - HOUR;
        if ( minTime <= this.generatedOn ){
            return this._token;
        } else {
            return null;
        }
    }

    get type(): string {
	    return this._type.toUpperCase();
	}

