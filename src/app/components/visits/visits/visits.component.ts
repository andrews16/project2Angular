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

}
