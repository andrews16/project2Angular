import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-select-patient',
  templateUrl: './select-patient.component.html',
  styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

  constructor(
    private patientService: PatientService
  ) { }

  ngOnInit() {
    // Load in a list of the doctor's patient's
    // Use bootstrap's typeahead
   //  https://ng-bootstrap.github.io/#/components/typeahead/examples
  }

  selectPatient() {
    // if (isNumber(this.rxInput)) {
    //  this.patientService.getPatientById();
// send currentpatient to commservice for the outer class to get 
// oter class will hide this component when its done.\
    

  }

}
