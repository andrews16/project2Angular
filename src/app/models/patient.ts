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

    private _patientId: number;
    public get patientId(): number {
        return this._patientId;
    }
    public set patientId(v: number) {
        this._patientId = v;
    }

    private _doctorId: number;
    public get doctorId(): number {
        return this._doctorId;
    }
    public set doctorId(v: number) {
        this._doctorId = v;
    }

}
