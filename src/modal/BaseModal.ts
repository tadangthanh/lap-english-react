export class BaseModal {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
    createdBy: string;

    constructor(id: number, createdAt: Date, updatedAt: Date, updateBy: string, createdBy: string) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.updatedBy = updateBy;
        this.createdBy = createdBy;
    }
}