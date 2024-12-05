import { BaseModal } from "./BaseModal";

export class MainTopic extends BaseModal {
    name: string;
    constructor(id: number, name: string, createdAt: Date, updatedAt: Date, updateBy: string, cratedBy: string) {
        super(id, createdAt, updatedAt, updateBy, cratedBy);
        this.name = name;
    }

}