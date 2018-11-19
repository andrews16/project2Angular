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

    constructor(id: number,
        name: string,
        dateStarted: string,
        dateEnded: string,
        dose: string,
        frequency: string,
        patientId: number) {
            this.id = id;
            this.name = name;
            this.dateStarted = dateStarted;
            this.dateEnded = dateEnded;
            this.dose = dose;
            this.frequency = frequency;
            this.patientId = patientId;
         }


   private _id: number;
   public get id(): number {
       return this._id;
   }
   public set id(v: number) {
       this._id = v;
   }

   private _name: string;
   public get name(): string {
       return this._name;
   }
   public set name(v: string) {
       this._name = v;
   }

   private _dateStarted: string;
   public get dateStarted(): string {
       return this._dateStarted;
   }
   public set dateStarted(v: string) {
       this._dateStarted = v;
   }

   private _dateEnded: string;
   public get dateEnded(): string {
       return this._dateEnded;
   }
   public set dateEnded(v: string) {
       this._dateEnded = v;
   }

   private _dose: string;
   public get dose(): string {
       return this._dose;
   }
   public set dose(v: string) {
       this._dose = v;
   }

   private _frequency: string;
   public get frequency(): string {
       return this._frequency;
   }
   public set frequency(v: string) {
       this._frequency = v;
   }

   private _patientId: number;
   public get patientId(): number {
       return this._patientId;
   }
   public set patientId(v: number) {
       this._patientId = v;
   }

   toJsonString(): string {
        let json = JSON.stringify(this);
        Object.keys(this).filter(key => key[0] === '_').forEach(key => {
            json = json.replace(key, key.substring(1));
        });

        return json;
    }


}
