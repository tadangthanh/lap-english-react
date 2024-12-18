import { BaseModal } from "./BaseModal";
import { Reward } from "./Reward";
import { Task } from "./Task";

export class Title extends BaseModal{
    image:string;
    title:string;
    task:Task;
    reward:Reward;

    constructor(id:number,image:string,title:string,task:Task,reward:Reward,createdAt:Date,createdBy:string,updatedAt:Date,updatedBy:string){
        super(id,createdAt,updatedAt,createdBy,updatedBy);
        this.image = image;
        this.title = title;
        this.task = task;
        this.reward = reward;
    }
}