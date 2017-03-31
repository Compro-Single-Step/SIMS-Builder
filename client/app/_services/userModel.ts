export class User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    enable: boolean ;
    password?: string;
    constructor(){
        this.username = "";
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.role = "";
        this.password = "";
        this.enable = true;
    }
 }