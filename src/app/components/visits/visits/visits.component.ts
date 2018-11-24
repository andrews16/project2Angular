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

  id : number;
    patientId : number;
    doctorId : number;
    date : string;
    bloodpressure : string;
    weight : number;
    doctorDescription : string;
    PatientNote : string;

  currentPatient: Patient;
  currentPatientSub: Subscription;

  visit = new Visit();

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
    const visit = new Visit();
    visit.date = this.date;
    visit.weight = this.weight;
    visit.patientId = this.patientId;
    visit.doctorId = this.doctorId;
    visit.bloodpressure = this.bloodpressure;
    visit.doctorDescription = this.doctorDescription;
    visit.PatientNote = this.doctorDescription;
    this.visitService.addVisit(visit).subscribe( (data) => {
      this.visitService.addVisit(data);
    })
  }

}
