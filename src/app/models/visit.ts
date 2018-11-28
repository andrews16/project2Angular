export class Visit {

constructor(
    public id? : number,
    public date? : string,
    public patientId? : number,
 	public doctorId? : number,  
    public weight? : number,
    public bloodpressure? : string,
    public doctorDescription? : string,
    public PatientNote? : string
) {}
}