import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { VisitService } from '../../services/visit.service';
import { Patient } from '../../models/patient';
import { Subscription } from 'rxjs';
import { Visit } from '../../models/visit';

@Component({
  selector: 'app-visit-search',
  templateUrl: './visit-search.component.html',
  styleUrls: ['./visit-search.component.scss']
})
export class VisitSearchComponent implements OnInit {

  visitId : number;
  patientId : number;
  doctorId : number;
  date : string;
  bloodpressure : string;
  weight : number;
  firstName : string;
  lastName : string;

  doctorDescription : string;

  PatientNote : string;


  visit = new Visit(
    0,
    '',
    0,
    0,
    0,
    '',
    '',
    ''
  );

  
  currentPatient: Patient;
  currentPatientSub: Subscription;


  constructor(private visitService: VisitService, 
    private patientService: PatientService) { }

  ngOnInit() {
    this.currentPatientSub = this.patientService.$patient.subscribe((data) => {
      this.currentPatient = data;
      this.currentPatient.doctorId = this.doctorId
      console.log(data);
    });

    if (this.patientService.currentPatient !== undefined) {
      this.patientService.nextPatient(this.patientService.currentPatient);
    }
  }
  searchVisit() {
    const visit = new Visit(
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
    );
    // Clears out current patient so no information is confused.
    this.visitService.currentVisit = visit;
    if (this.visitId) {
      visit.visitId = this.visitId;
    }
      visit.date = this.date;
      visit.patientId = this.patientId;
      visit.doctorId = this.doctorId;
      visit.weight = this.weight;
      visit.bloodpressure = this.bloodpressure;
      visit.doctorDescription = this.doctorDescription;
      visit.PatientNote = this.PatientNote;
    //const errorBox = document.getElementById('visit-error-message');
    this.visitService.getVisit(visit).subscribe( (data) => {
      // if (data.length > 1) {
      //   this.multipleResults = true;
      //   errorBox.innerText = '';
      //   this.pList = data;
      // } else if (data.length === 0) {
      //   this.multipleResults = false;
      //   errorBox.innerText = 'No results found!';
      // } else {
      //   this.multipleResults = false;
       
     // errorBox.innerText = '';
        this.visitService.getVisit(data);
     // }
    // }, (err) => {
    //   if ( err.status % 399 < 100 ) {
    //   errorBox.innerText = 'Error! ' + err.status;
    //   } else {
    //     errorBox.innerText = 'Unresolved server error! ' + err.status;
    //   }
    // });
  });
}
}
