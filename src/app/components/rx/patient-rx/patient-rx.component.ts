import { Component, OnInit, Input } from '@angular/core';
import { RxService } from 'src/app/services/rx.service';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-patient-rx',
  templateUrl: './patient-rx.component.html',
  styleUrls: ['./patient-rx.component.css']
})
export class PatientRxComponent implements OnInit {

  loading: boolean;
  showArchive: boolean;
  showRxTable: boolean;

  currentPatientSub: Subscription;
  currentPatient: Patient;

  loadingArchive = false;

  @Input() id: number;

  constructor(private rxService: RxService,
     private patientService: PatientService) {
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

  ngOnInit() {
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
          errorBox.innerText = `You currently aren't prescribed anything!`;
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
    }

}
