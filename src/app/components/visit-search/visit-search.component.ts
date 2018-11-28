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

  visit: Visit;
   id: number;
  // patientId: number;
   doctorId: number;
  // date: string;
  // bloodpressure: string;
  // weight: number;
  // firstName: string;
  // lastName: string;

  doctorDescription: string;

  PatientNote: string;


  // visit = new Visit();
  currentPatient: Patient;
  currentPatientSub: Subscription;


  constructor(private visitService: VisitService,
    private patientService: PatientService) { }

  ngOnInit() {
    this.currentPatientSub = this.patientService.$patient.subscribe((data) => {
      this.currentPatient = data;
      this.currentPatient.doctorId = this.doctorId;
      console.log(data);
    });

    // visit = new Visit();

    if (this.patientService.currentPatient !== undefined) {
      this.patientService.nextPatient(this.patientService.currentPatient);
    }
  }
  searchVisit() {
    const visit = new Visit();
    if (this.id == null) {
      console.log("id is null");
    }
    console.log(this.id);
  //  visit.id = 0;
    // Clears out current patient so no information is confused.
    // this.visitService.currentVisit = visit;
      visit.id = this.id;
      // visit.date = this.date;
      // visit.patientId = this.patientId;
      // visit.doctorId = this.doctorId;
      // visit.weight = this.weight;
      // visit.bloodpressure = this.bloodpressure;
      // visit.doctorDescription = this.doctorDescription;
      // visit.PatientNote = this.PatientNote;
    // const errorBox = document.getElementById('visit-error-message');
    this.visitService.getVisit(visit).subscribe( (query) => {
      console.log("visit component");
      console.log(query);
      this.visit = query;
      // this.visitService.getVisit(query);
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
