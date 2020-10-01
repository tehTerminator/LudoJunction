import { HOUR, UserType } from './collection';

export class User {

    constructor(
        private theId: number,
        public title: string,
        public mobile: string,
        private theToken: string,
        public generatedOn: number,
        private theType: UserType
    ) { }

    get token(): string {
        const minTime = (new Date()).getTime() - HOUR;
        if (minTime <= this.generatedOn) {
            return this.theToken;
        } else {
            return null;
        }
    }

    get type(): UserType {
        return this.theType;
    }
    
    get id(): number {
        return this.theId;
    }
}
