import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

  constructor(
    private patientService: PatientService,
  ) { }

  id: number;
  lastName: string;
  birthday: string;

  multipleResults: boolean;

  pList: Patient[];
  currentPatient: Patient;
  currentPatientSub: Subscription;

  ngOnInit() {
    // Load in a list of the doctor's patient's
    // Use bootstrap's typeahead
   //  https://ng-bootstrap.github.io/#/components/typeahead/examples
    this.currentPatientSub = this.patientService.$patient.subscribe( (data) => {
      this.currentPatient = data;
    });

    if (this.patientService.currentPatient && this.patientService.currentPatient.id ) {
      this.currentPatient = this.patientService.currentPatient;
    }


  }

  searchPatient() {
    const patient = new Patient();
    // Clears out current patient so no information is confused.
    this.patientService.currentPatient = patient;
    if (this.id) {
      patient.id = this.id;
    }
      patient.lastName = this.lastName;
      patient.birthday = this.birthday;
    const errorBox = document.getElementById('patient-error-message');
    this.patientService.getPatient(patient).subscribe( (data) => {
      if (data.length > 1) {
        this.multipleResults = true;
        errorBox.innerText = '';
        this.pList = data;
      } else if (data.length === 0) {
        this.multipleResults = false;
        errorBox.innerText = 'No results found!';
      } else {
        this.multipleResults = false;
        errorBox.innerText = '';
        this.patientService.nextPatient(data[0]);
      }
    }, (err) => {
      if ( err.status % 399 < 100 ) {
      errorBox.innerText = 'Error! ' + err.status;
      } else {
        errorBox.innerText = 'Unresolved server error! ' + err.status;
      }
    });
  }

  selectPatient(i: number) {
    this.patientService.nextPatient(this.pList[i]);
    this.multipleResults = false;
  }

}
