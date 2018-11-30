import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../../services/visit.service';
import { Visit } from '../../../models/visit';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']

//   animations: [
//     trigger('listStagger', [
//       transition('* <=> *', [
//         query(
//           ':enter',
//           [
//             style({ opacity: 0, transform: 'translateY(-15px)' }),
//             stagger(
//               '50ms',
//               animate(
//                 '550ms ease-out',
//                 style({ opacity: 1, transform: 'translateY(0px)' })
//               )
//             )
//           ],
//           { optional: true }
//         ),
//         query(':leave', animate('50ms', style({ opacity: 0 })), {
//           optional: true
//         })
//       ])
//     ])
//   ]
 })
export class VisitsComponent implements OnInit {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  bloodpressure: string;
  weight: number;
  firstName: string;
  lastName: string;

  doctorDescription: string;

  PatientNote: string;




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
    this.visit.id = this.id;
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
      // this.resetVisitForm();

          this.date = '';
    this.weight = null;
    this.patientId = null;
    this.doctorId = null;
    this.bloodpressure = '';
    this.doctorDescription = '';
    this.PatientNote = '';
      
  });

//   resetVisitForm() {
//     this.date = '';
//     this.weight = null;
//     this.patientId = null;
//     this.doctorId = null;
//     this.bloodpressure = '';
//     this.doctorDescription = '';
//     this.PatientNote = '';
//   }
 }
}
