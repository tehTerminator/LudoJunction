import { HOUR } from './collection';

export class User {

    constructor(
        private theId: number,
        public title: string,
        public username: string,
        private theToken: string,
        public generatedOn: number,
        private theType: string
    ) { }

    get token(): string {
        const minTime = (new Date()).getTime() - HOUR;
        if (minTime <= this.generatedOn) {
            return this.theToken;
        } else {
            return null;
        }
    }

    get type(): string {
        return this.theType.toUpperCase();
    }

    get id(): number {
        return this.theId;
    }
}
