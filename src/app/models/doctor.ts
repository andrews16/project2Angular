import { User } from './user';

export class Doctor extends User {
    getFullName() {
        return `Dr. ${this.firstName} ${this.lastName}`;
    }

}
