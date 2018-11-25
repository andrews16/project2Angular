import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { RxService } from 'src/app/services/rx.service';
import { Rx } from 'src/app/models/rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubmittedNewRxComponent } from './submitted-new-rx-component';



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
    private rxService: RxService,
    private modalService: NgbModal) {
    this.currentPatientSub = this.patientService.$patient.subscribe( (data) => {
      this.patient = data;
      this.rx.patientId = this.patient.id;
    });

    this.rxSub = this.rxService.$rx.subscribe( (data) => {
      this.rx = new Rx();
      this.rx.name = data.name;
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
    this.checked = true;
    if (this.rx.dose &&
     this.rx.frequency &&
     this.rx.patientId &&
     this.rx.name) {
     this.rxService.add(this.rx).subscribe(
      (data) => {
        this.open(SubmittedNewRxComponent);
        this.resetForm();
        this.patientService.nextPatient(this.patientService.currentPatient);
      });
    }
  }

  resetForm() {
    this.checked = false;
    this.rx.dose = null;
    this.rx.frequency = null;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'successfully-added-prescription', centered: true});
  }

}

