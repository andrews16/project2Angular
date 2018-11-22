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

    constructor() {
        super();
    }

    public patientId: number;
    public doctorId: number;
    public birthday: string;

}
