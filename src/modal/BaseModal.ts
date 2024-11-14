export class BaseModal {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    updateBy: string;

    constructor(id: number, createdAt: Date, updatedAt: Date, updateBy: string) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.updateBy = updateBy;
    }
}