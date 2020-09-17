export class User{

    constructor(
		private _id: number,
        public title: string,
        public username: string,
        private _token: string,
        public generatedOn: number,
		private _type: string
    ) { }

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

	get id(): number{
		return this._id;
	}
}
