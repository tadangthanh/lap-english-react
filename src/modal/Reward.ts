import { BaseModal } from "./BaseModal";

export class Reward extends BaseModal {
    gold: number;
    diamond: number;
    constructor(id: number, gold: number, diamond: number, createdAt: Date, createdBy: string, updatedAt: Date, updatedBy: string) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.gold = gold;
        this.diamond = diamond;
    }
}