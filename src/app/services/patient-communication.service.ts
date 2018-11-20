import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientCommunicationService {

  $patient = new Subject<Patient>();
  currentPatient: Patient;
  $patientList = new Subject<Patient[]>();
  currentPatientList: Patient[];

  constructor() { }

  nextPatient(patient: Patient) {
    this.$patient.next(patient);
    this.currentPatient = patient;
  }

  nextPatientList(patientList: Patient[]) {
    if (!patientList) {
      console.log('patient-comm-service no patientlist to push!');
    }
    this.$patientList.next(patientList);
    this.currentPatientList = patientList;
  }

}
