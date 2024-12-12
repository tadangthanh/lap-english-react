import { BaseModal } from "./BaseModal";

export class MainTopic extends BaseModal {
    name: string;
    word: boolean;
    diamond: number;
    gold: number;
    constructor(id: number, name: string, word: boolean, diamond: number, gold: number, createdAt: Date, updatedAt: Date, updateBy: string, cratedBy: string) {
        super(id, createdAt, updatedAt, updateBy, cratedBy);
        this.word = word;
        this.name = name;
        this.diamond = diamond;
        this.gold = gold;
    }

}