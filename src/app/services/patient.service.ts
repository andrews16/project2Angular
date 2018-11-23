import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url: string;

  $patient = new Subject<Patient>();
  currentPatient: Patient;
  $patientList = new Subject<Patient[]>();
  currentPatientList: Patient[];

  constructor(private httpClient: HttpClient,
    private globals: GlobalsService) {
      this.url = this.globals.API_URL + 'users/patient';
  }


  getPatient(patient: Patient) {
    const apiUrl = `${this.url}?\
${patient.id ? `id=${patient.id}&` : ''}\
${patient.lastName ? `lastName=${patient.lastName}&` : ''}\
${patient.birthday ? `birthday=${patient.birthday}` : ''}`; 
  console.log(apiUrl);
    return this.httpClient.get<Patient[]>(apiUrl,
      {headers:
        {'Content-Type': 'application/json'}
      });
  }

  nextPatient(data: Patient) {
    // Data must be converted like this in order to pass along the getFullName() method.
    const patient = new Patient(data.id, data.username, data.firstName,
      data.lastName, data.userRole, data.patientId, data.doctorId, data.birthday);
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
