import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/services/patient.service';
import { RxService } from 'src/app/services/rx.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-remove-rx-dialog',
  templateUrl: './remove-rx-dialog.component.html',
  styleUrls: ['./remove-rx-dialog.component.scss']
})
export class RemoveRxDialogComponent implements OnInit {

  @Input() removalCandidate;
  @Input() patient;
  @Input() loaded;

  resolved: boolean;
  error: boolean;

  constructor(public activeModal: NgbActiveModal,
    private rxService: RxService,
    private patientService: PatientService) {
    }


  ngOnInit() {
    this.resolved = false;
    this.error = false;
  }

  removeRx() {
    // Remove one and then update the list.
    this.rxService.remove(this.removalCandidate.id).subscribe( () => {
      // This will refresh the tables
      this.patientService.nextPatient(this.patientService.currentPatient);
      this.resolved = true;
    }, () => {
      this.resolved = true;
      this.error = true;
    });
  }

}
