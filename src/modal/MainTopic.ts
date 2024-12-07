import { BaseModal } from "./BaseModal";

export class MainTopic extends BaseModal {
    name: string;
    word: boolean;
    constructor(id: number, name: string, word: boolean, createdAt: Date, updatedAt: Date, updateBy: string, cratedBy: string) {
        super(id, createdAt, updatedAt, updateBy, cratedBy);
        this.word = word;
        this.name = name;
    }

}