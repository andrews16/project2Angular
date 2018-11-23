import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RxService } from 'src/app/services/rx.service';
import { Patient } from 'src/app/models/patient';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-doctor-view-rx',
  templateUrl: './doctor-view-rx.component.html',
  styleUrls: ['./doctor-view-rx.component.css']
})
export class DoctorViewRxComponent implements OnInit, OnDestroy {

  loading: boolean;
  showArchive: boolean;
  showRxTable: boolean;

  currentPatientSub: Subscription;
  currentPatient: Patient;

  loadingArchive = false;

  @Input() id: number;

  constructor(private rxService: RxService,
     private patientService: PatientService) { }

  ngOnInit() {
    this.currentPatientSub = this.patientService.$patient.subscribe((data) => {
      this.currentPatient = data;
      this.getRxList(this.currentPatient);
    });

    // If the pat. service has a patient, push it out to this component so
    // the subscription function runs.
    if (this.patientService.currentPatient !== undefined) {
      this.patientService.nextPatient(this.patientService.currentPatient);
    }
  }

  // On destroy, clear the patient info
  ngOnDestroy() {
    if (this.currentPatientSub) {
      this.currentPatientSub.unsubscribe();
    }
  }

  getRxList(payload: Patient) {
    this.loading = true;
    const errorBox = document.getElementById('error-message');
    this.rxService.getList(payload).subscribe(
      (data) => {
        // Pass the data to the other components, clear the error box,
        // stop loading, and show the table.
      this.rxService.nextRxList(data);
      errorBox.innerText = '';
      this.showRxTable = true;
      this.loading = false;
      },
      (err) => {
        if ( err.status % 399 < 100 ) {
          this.showRxTable = false;
          errorBox.innerText = `No prescriptions found!`;
          this.loading = false;
        } else {
          errorBox.innerHTML = 'Error! ' +  err.status;
          this.loading = false;
        }
      });
  }

  getArchive() {
    this.loadingArchive = true;
    const errorBox = document.getElementById('error-archive-message');
    this.rxService.getArchive(this.currentPatient).subscribe(
      (data) => {
        if ( data.length === 0 ) {
          this.showArchive = false;
          errorBox.innerText = `No prescription history found!`;
        } else {
          this.rxService.nextRxList(data);
          errorBox.innerText = '';
          this.showArchive = true;
        }
        this.loadingArchive = false;
      },
      (err) => {
        errorBox.innerHTML = 'Error! ' +  err.status;
        this.loadingArchive = false;
    });

  }
  hideArchive() {
    this.showArchive = false;
  }
}
