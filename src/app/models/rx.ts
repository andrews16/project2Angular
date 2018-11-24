export class Rx {
    // Class Contains:
    // id
    // name
    // dateStarted
    // dateEnded
    // dose
    // frequency
    // patientId
    // toJsonString
    id: number;
    name: string;
    dateStarted: string;
    dateEnded: string;
    dose: string;
    frequency: string;
    patientId: number;


    constructor(id?: number,
        name?: string,
        dateStarted?: string,
        dateEnded?: string,
        dose?: string,
        frequency?: string,
        patientId?: number) {
            this.id = id;
            this.name = name;
            this.dateStarted = dateStarted;
            this.dateEnded = dateEnded;
            this.dose = dose;
            this.frequency = frequency;
            this.patientId = patientId;
         }

         // Method was used to transform object to something that the backend can understand,
         // But I realized (later) that that isn't going to handle it properly.
   toJsonString(): string {
        let json = JSON.stringify(this);
        Object.keys(this).filter(key => key[0] === '_').forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return json;
    }


}
