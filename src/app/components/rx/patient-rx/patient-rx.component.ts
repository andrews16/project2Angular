import { Component, OnInit, Input } from '@angular/core';
import { RxService } from 'src/app/services/rx.service';
import { Patient } from 'src/app/models/patient';
import { RxCommunicationService } from 'src/app/services/rx-communication.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-patient-rx',
  templateUrl: './patient-rx.component.html',
  styleUrls: ['./patient-rx.component.css']
})
export class PatientRxComponent implements OnInit {
// Most of this logic should be moved to doctor-view-rx
  search: any;
  loading: boolean;
  success: boolean;


  @Input() id: number;

  constructor(private rxService: RxService, private rxComm: RxCommunicationService) { }

  ngOnInit() {
  }

  // Search method will be used to process the input
  searchRx() {
    this.getRxList(this.search);
  }

  getRxList(search: number) {
    this.loading = true;
    const payload = new Patient();
    payload.id = search;
    const errorBox = document.getElementById('error-message');

    this.rxService.getList(payload).subscribe(
      (data) => {
      this.rxComm.nextRxList(data);
      errorBox.innerText = '';
      this.success = true;
      },
      (err) => {
      if (err.status === 404) {
        this.success = false;
        errorBox.innerText = `No prescriptions found for user ${search}`;
      } else {
        errorBox.innerHTML = 'Error!' +  err.error;
      }
      }, () => {
       this.loading = false;
    });
  }

}
