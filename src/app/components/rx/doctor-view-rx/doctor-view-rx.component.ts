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
      this.getArchive();
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

  getRxList(patient: Patient) {
    if (patient.id) {
      this.loading = true;
      const errorBox = document.getElementById('error-message');
      this.rxService.getList(patient).subscribe(
      (data) => {
        // Pass the data to the other components, clear the error box,
        // stop loading, and show the table.
        if ( data.length === 0 ) {
          this.showRxTable = false;
          errorBox.innerText = `No prescription history found!`;
        } else {
          this.showRxTable = true;
          errorBox.innerText = '';
        }
        this.loading = false;
        this.rxService.nextRxList(data);
      },
      (err) => {
          errorBox.innerHTML = 'Error! ' +  err.status;
          this.loading = false;
        });
      }
  }

  getArchive() {
    if (this.currentPatient.id) {
      this.loadingArchive = true;
      const errorBox = document.getElementById('error-archive-message');
      this.rxService.getArchive(this.currentPatient).subscribe(
        (data) => {
                if ( data.length === 0 ) {
                  this.showArchive = false;
                  errorBox.innerText = `No prescription history found!`;
        } else {
          errorBox.innerText = '';
          this.showArchive = true;
        }
        // Pass the data to the other components and stop loading
        this.loadingArchive = false;
        this.rxService.nextRxArchive(data);
      },
      (err) => {
        errorBox.innerHTML = 'Error! ' +  err.status;
          this.loadingArchive = false;
        });
      }

        //   (data) => {

    //       this.rxService.nextRxList(data);
    //       errorBox.innerText = '';
    //       this.showArchive = true;
    //     }
    //     this.loadingArchive = false;
    //   },
    //   (err) => {
    //     errorBox.innerHTML = 'Error! ' +  err.status;
    //     this.loadingArchive = false;
    //     this.showArchive = false;
    // });

  }

}
