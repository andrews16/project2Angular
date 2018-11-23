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

    getFullName() {
        return '${firstName} ${lastName}';
    }

}
