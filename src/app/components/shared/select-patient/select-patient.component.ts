import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { PatientCommunicationService } from 'src/app/services/patient-communication.service';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

  constructor(
    private patientService: PatientService,
    private patientComm: PatientCommunicationService
  ) { }

  id: number;
  lastName: string;
  birthday: string;

  multipleResults: boolean;

  pList: Patient[];

  ngOnInit() {
    // Load in a list of the doctor's patient's
    // Use bootstrap's typeahead
   //  https://ng-bootstrap.github.io/#/components/typeahead/examples


  }

  searchPatient() {
    const patient = new Patient();
    patient.id = this.id;
    patient.lastName = this.lastName;
    patient.birthday = this.birthday;
    const errorBox = document.getElementById('patient-error-message');
    this.patientService.getPatient(patient).subscribe( (data) => {
      if (data.length > 1) {
        this.multipleResults = true;
        errorBox.innerText = '';
        this.pList = data;
      } else if (data[0] === null ) {
        this.multipleResults = false;
        errorBox.innerText = 'No results found!';
      } else {
        this.multipleResults = false;
        errorBox.innerText = '';
        this.patientComm.nextPatient(data[0]);
      }
    }, (err) => {
      errorBox.innerText = 'Error! ' + err.status;
    });
  }

  selectPatient(n: number) {
    this.patientComm.nextPatient(this.pList[n]);
    this.multipleResults = false;
  }

}
