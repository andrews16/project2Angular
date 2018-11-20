import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RxService } from 'src/app/services/rx.service';
import { Patient } from 'src/app/models/patient';
import { RxCommunicationService } from 'src/app/services/rx-communication.service';
import { Subscription } from 'rxjs';
import { PatientCommunicationService } from 'src/app/services/patient-communication.service';


@Component({
  selector: 'app-doctor-view-rx',
  templateUrl: './doctor-view-rx.component.html',
  styleUrls: ['./doctor-view-rx.component.css']
})
export class DoctorViewRxComponent implements OnInit, OnDestroy {

  loading: boolean;
  success: boolean;

  currentPatientSub: Subscription;
  currentPatient: Patient;

  showArchive = false;

  @Input() id: number;

  constructor(private rxService: RxService,
     private rxComm: RxCommunicationService,
     private patientComm: PatientCommunicationService) { }

  ngOnInit() {
    this.currentPatientSub = this.patientComm.$patient.subscribe((data) => {
      this.currentPatient = <Patient> data;
      console.log(data);
      this.getRxList(this.currentPatient);
    });

  }

  // On destroy, clear the patient info
  ngOnDestroy() {
    if (this.currentPatientSub) {
      this.currentPatientSub.unsubscribe();
    }
  }

  // Search method will be used to process the input
  searchRx() {
//    this.getRxList(patient);
  }

  getRxList(payload: Patient) {
    this.loading = true;
    const errorBox = document.getElementById('error-message');
    this.rxService.getList(payload).subscribe(
      (data) => {
        console.log('doctor-view-rx getlist');
        console.log(data);
      this.rxComm.nextRxList(data);
      errorBox.innerText = '';
      this.success = true;
      },
      (err) => {
        if ( err.status % 399 < 100 ) {
          this.success = false;
          errorBox.innerText = `No prescriptions found!`;
          this.loading = false;
        } else {
          errorBox.innerHTML = 'Error! ' +  err.status;
          this.loading = false;
        }
      });
  }

  getArchive(payload: Patient) {
    this.loading = true;
    const errorBox = document.getElementById('error-message');
    this.rxService.getArchive(payload).subscribe(
      (data) => {
      this.rxComm.nextRxList(data);
      errorBox.innerText = '';
      this.success = true;
      },
      (err) => {
      if ( err.status % 399 < 100 ) {
        this.success = false;
        errorBox.innerText = `No prescriptions found!`;
        this.loading = false;
      } else {
        errorBox.innerHTML = 'Error! ' +  err.status;
        console.log('Log from doc-view-rx');
        console.log(err);
        this.loading = false;
      }
    });

  }

}
