export class User {
    // Class contains:
    // id
    // firstName
    // lastName
    // username
    // userRole
    // getFullName()
    // toJsonString()


    public id: number;
    public username: string;
    public firstName: string;
    public lastName: string;
    public role: string;

    constructor(
        id?: number,
        username?: string,
        firstName?: string,
        lastName?: string,
        userRole?: string
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = userRole;
    }

    getFullName() {
        const prefix = (this.role === 'DOCTOR') ? 'Dr.' : '';
        return `${prefix} ${this.firstName} ${this.lastName}`;
    }

}
