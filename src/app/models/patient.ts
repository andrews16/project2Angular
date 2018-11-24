import { User } from './user';

export class Patient extends User {
    // Class contains:
    // doctorId
    // Inherited:
    // username
    // firstName
    // lastName
    // getFullName()
    public doctorId: number;
    public birthday: string;

    constructor(
        id?: number,
        username?: string,
        firstName?: string,
        lastName?: string,
        userRole?: number,
        doctorId?: number,
        birthday?: string
    ) {
        super(id, username, firstName, lastName, userRole);
        this.userRole = userRole;
        this.doctorId = doctorId;
        this.birthday = birthday;
    }

}
