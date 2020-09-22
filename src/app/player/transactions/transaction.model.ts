export class Transaction {
    id: number;
    postedOn: Date;
    amount: number;
    description: string;
    balance: number;

    constructor(t: TransactionData, currentUserId: number) {
        this.id = +t.id;
        this.postedOn = new Date(t.postedOn);
        this.description = t.description;

        if (+t.fromUser === currentUserId) {
            this.amount = -t.amount;
            this.balance = +t.fromBalance;
        } else {
            this.amount = +t.amount;
            this.balance = +t.toBalance;
        }
    }
}

export interface TransactionData {
    id: string;
    postedOn: string;
    fromUser: string;
    toUser: string;
    amount: string;
    description: string;
    fromBalance: string;
    toBalance: string;
}