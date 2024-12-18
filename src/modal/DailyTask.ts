import { BaseModal } from "./BaseModal";
import { Reward } from "./Reward";
import { Task } from "./Task";

export class DailyTask extends BaseModal{
    task:Task;
    reward:Reward;

    constructor(id:number,task:Task,reward:Reward,createdAt:Date,createdBy:string,updatedAt:Date,updatedBy:string){
        super(id,createdAt,updatedAt,createdBy,updatedBy);
        this.task = task;
        this.reward = reward;
    }
}