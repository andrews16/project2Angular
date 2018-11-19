import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RxService } from 'src/app/services/rx.service';
import { Patient } from 'src/app/models/patient';
import { RxCommunicationService } from 'src/app/services/rx-communication.service';


@Component({
  selector: 'app-doctor-view-rx',
  templateUrl: './doctor-view-rx.component.html',
  styleUrls: ['./doctor-view-rx.component.css']
})
export class DoctorViewRxComponent implements OnInit, OnDestroy {

  loading: boolean;
  success: boolean;

  search = new Patient();
  patientId: number;
//  lastName: string;
//  birthday: string;

  @Input() id: number;

  constructor(private rxService: RxService, private rxComm: RxCommunicationService) { }

  ngOnInit() {
  }

  // On destroy, clear the patient info in the RxCommService
  ngOnDestroy() {
    this.rxComm.currentPatient = undefined;
  }

  // Search method will be used to process the input
  searchRx() {
    const patient = new Patient();
    patient.id = this.patientId;
    console.log(patient);
//    patient.lastName = this.lastName;
//    patient.birthday = this.birthday;
    this.getRxList(patient);
  }

  getRxList(payload: Patient) {
    this.loading = true;
    const errorBox = document.getElementById('error-message');

    this.rxService.getList(payload).subscribe(
      (data) => {
        console.log('doctor-view-rx');
        console.log(data);
      this.rxComm.nextRxList(data);
      errorBox.innerText = '';
      this.success = true;
      },
      (err) => {
      if (err.status === 404) {
        this.success = false;
        errorBox.innerText = `No prescriptions found!`;
        this.loading = false;
      } else {
        errorBox.innerHTML = 'Error! ' +  err.status;
        console.log('Log from doc-view-rx');
        console.log(err);
        this.loading = false;
      }
      }, () => {
        console.log('Log from doc-view-rx, reached complete block');
       this.loading = false;
    });
  }

}
