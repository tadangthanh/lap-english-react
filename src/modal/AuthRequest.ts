export class AuthRequest {
    email: string;
    password: string;
    constructor(username: string, password: string) {
        this.email = username;
        this.password = password;
    }

}