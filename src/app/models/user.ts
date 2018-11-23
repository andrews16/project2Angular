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
    public userRole: number;
    constructor(
        id?: number,
        username?: string,
        firstName?: string,
        lastName?: string,
        userRole?: number
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = userRole;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

}
