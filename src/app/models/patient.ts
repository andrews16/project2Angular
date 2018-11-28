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
        userRole?: string,
        doctorId?: number,
        birthday?: string
    ) {
        super(id, username, firstName, lastName, userRole);
        this.role = userRole;
        this.doctorId = doctorId;
        this.birthday = birthday;
    }

}
