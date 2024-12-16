import { BaseModal } from "./BaseModal";
import { FunTaskQuiz } from "./FunTaskQuiz";
import { Reward } from "./Reward";
import { TypeTask } from "./TypeTask";

export class Task extends BaseModal{
    description: string;
    type: TypeTask;
    keyFunUpdate:FunTaskQuiz
    total :number;
    reward:Reward;
    constructor(id:number,description: string, type: TypeTask, keyFunUpdate:FunTaskQuiz, total :number, reward:Reward, createdAt: Date, createdBy: string, updatedAt: Date, updatedBy: string) {
        super(id, createdAt, updatedAt, createdBy, updatedBy);
        this.description = description;
        this.type = type;
        this.keyFunUpdate = keyFunUpdate;
        this.total = total;
        this.reward = reward;
    }

}