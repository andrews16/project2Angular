import { User } from './user';

export class Patient extends User {
    // Class contains:
    // patientId
    // doctorId
    // Inherited:
    // username
    // firstName
    // lastName
    // getFullName()
    public patientId: number;
    public doctorId: number;
    public birthday: string;

    constructor(
        id?: number,
        username?: string,
        firstName?: string,
        lastName?: string,
        userRole?: number,
        patientId?: number,
        doctorId?: number,
        birthday?: string
    ) {
        super(id, username, firstName, lastName, userRole);
        this.patientId = patientId;
        this.userRole = userRole;
        this.doctorId = doctorId;
        this.birthday = birthday;
    }

}
