import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../../services/visit.service';
import { Visit } from '../../../models/visit';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
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

  // visit = new Visit();

  constructor(private visitService: VisitService, 
  private patientService: PatientService) { }

  ngOnInit() {
    this.currentPatientSub = this.patientService.$patient.subscribe((data) => {
      this.currentPatient = data;
    });

    if (this.patientService.currentPatient !== undefined) {
      this.patientService.nextPatient(this.patientService.currentPatient);
    }
  }

  submitVisit() {
    // const visit = new Visit();
    this.visit.visitId = this.visitId;
    this.visit.date = this.date;
    this.visit.weight = this.weight;
    this.visit.patientId = this.currentPatient.id;
    this.visit.doctorId = this.doctorId;
    this.visit.bloodpressure = this.bloodpressure;
    this.visit.doctorDescription = this.doctorDescription;
    this.visit.PatientNote = this.doctorDescription;
    console.log(this.visit);

    this.visitService.addVisit(this.visit).subscribe( (data) => {
      console.log(data);
      this.visitService.addVisit(data);
  });
}

  // searchVisit() {
  //   const visit = new Visit(
  //     undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
  //   );
  //   // Clears out current patient so no information is confused.
  //   this.visitService.currentVisit = visit;
  //   if (this.id) {
  //     visit.id = this.id;
  //   }
  //     visit.date = this.date;
  //     visit.patientId = this.patientId;
  //     visit.doctorId = this.doctorId;
  //     visit.weight = this.weight;
  //     visit.bloodpressure = this.bloodpressure;
  //     visit.doctorDescription = this.doctorDescription;
  //     visit.PatientNote = this.PatientNote;
  //   //const errorBox = document.getElementById('visit-error-message');
  //   this.visitService.getVisit(visit).subscribe( (data) => {
  //     this.patientService.nextPatient(data[0]);
     
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
     // }
    // }, (err) => {
    //   if ( err.status % 399 < 100 ) {
    //   errorBox.innerText = 'Error! ' + err.status;
    //   } else {
    //     errorBox.innerText = 'Unresolved server error! ' + err.status;
    //   }
    // });
//   }
// )
// }
}