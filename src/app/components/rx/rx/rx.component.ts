import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { RxService } from 'src/app/services/rx.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {

  rxInput: any;


  patLastName: string;
  patBday: string;
  patId: number;
  patient: Patient;

  constructor(
    private patientService: PatientService,
    private rxService: RxService) { }

  ngOnInit() {
    // Load in a list of the doctor's patient's
    // Use bootstrap's typeahead
    // https://ng-bootstrap.github.io/#/components/typeahead/examples
  }

  selectPatient() {
    // if (isNumber(this.rxInput)) {
  //    this.patientService.getPatientById()
  }
}
