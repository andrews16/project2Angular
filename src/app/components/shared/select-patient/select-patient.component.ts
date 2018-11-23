import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';

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

  ngOnInit() {
    // Load in a list of the doctor's patient's
    // Use bootstrap's typeahead
   //  https://ng-bootstrap.github.io/#/components/typeahead/examples


  }

  searchPatient() {
    const patient = new Patient();
    patient.id = this.id ? this.id : null;
    patient.lastName = this.lastName;
    patient.birthday = this.birthday;
    const errorBox = document.getElementById('patient-error-message');
    this.patientService.getPatient(patient).subscribe( (data) => {
      console.log(data);
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
      console.log('select-patient-ts');
      console.log(err);
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
