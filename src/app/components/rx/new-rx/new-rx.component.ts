import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { RxService } from 'src/app/services/rx.service';
import { Rx } from 'src/app/models/rx';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-rx',
  templateUrl: './new-rx.component.html',
  styleUrls: ['./new-rx.component.scss']
})
export class NewRxComponent implements OnInit, OnDestroy {

  currentPatientSub: Subscription;
  patient = this.patientService.currentPatient;
  rx = this.rxService.currentRx;
  rxSub: Subscription;
  checked = false;


  constructor(private patientService: PatientService,
    private rxService: RxService) {
    this.currentPatientSub = this.patientService.$patient.subscribe( (data) => {
      this.patient = data;
      this.rx.patientId = this.patient.id;
    });

    this.rxSub = this.rxService.$rx.subscribe( (data) => {
    this.rx = new Rx();
    if (this.patient && this.patient.id) {
      this.rx.patientId = this.patient.id;
    }
    });

  }


  ngOnInit() {
  }

    // On destroy, clear the patient subscription
  ngOnDestroy() {
    if (this.currentPatientSub) {
      this.currentPatientSub.unsubscribe();
    }
    if (this.rxSub) {
      this.rxSub.unsubscribe();
    }
  }

  ///////////////////////////////
 // Section for adding new Rx //
//////////////////////////////

  onSubmit() {
    console.log('submit');
    this.checked = true;
    console.log(this.rx);
    if (this.rx.dose && this.rx.frequency && this.rx.patientId && this.rx.name) {
       this.rxService.add(this.rx).subscribe(
          (data) => {
            this.patientService.nextPatient(this.patientService.currentPatient);
              console.log('Form submitted successfully');
            },
            (error: HttpErrorResponse) => {
                  console.log(error);
              }
          );
          }
    }
  }

}
