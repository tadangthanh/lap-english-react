import { BaseModal } from "./BaseModal";
import { RewardType } from "./RewardType";

export class Reward extends BaseModal {
    rewardType: RewardType;
    quantity: number;
    constructor(id: number, name: string, rewardType: RewardType, quantity: number, createdAt: Date, createdBy: string, updatedAt: Date, updatedBy: string) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.rewardType = rewardType;
        this.quantity = quantity;
    }
}