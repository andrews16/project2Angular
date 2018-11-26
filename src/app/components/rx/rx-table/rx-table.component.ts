import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material';
import { RxTableDataSource } from './rx-table-datasource';
import { RxService } from 'src/app/services/rx.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Rx } from 'src/app/models/rx';
import { Subscription } from 'rxjs';
import { RemoveRxDialogComponent } from './remove-rx-dialog/remove-rx-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rx-table',
  templateUrl: './rx-table.component.html',
  styleUrls: ['./rx-table.component.css'],
})
export class RxTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RxTableDataSource;

  patient: Patient;
  patientSubscription: Subscription;
  removalCandidate: Rx;

  constructor(private rxService: RxService,
      private patientService: PatientService,
      private modalService: NgbModal) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'dose', 'frequency', 'dateStarted', 'remove'] ;

  ngOnInit() {
    this.dataSource = new RxTableDataSource(this.sort, this.rxService);
    this.patient = this.patientService.currentPatient;
    this.patientService.$patient.subscribe( (data) =>
      this.patient = data
    );
  }

  ngOnDestroy() {
    if (this.patientSubscription) {
      this.patientSubscription.unsubscribe();
    }
  }

  candidate(rx: any) {
    this.removalCandidate = rx;
    this.open();
  }

  open() {
    const modalRef = this.modalService.open(RemoveRxDialogComponent, { centered: true, backdropClass: 'light-blue-backdrop'});
    modalRef.componentInstance.removalCandidate = this.removalCandidate;
    modalRef.componentInstance.patient = this.patient;
    modalRef.componentInstance.loaded = true;

  }

  // removeRx() {
  //   // Remove one and then update the list.
  //   this.rxService.remove(this.removalCandidate.id).subscribe( () => {
  //     // This will refresh the tables
  //     this.patientService.nextPatient(this.patientService.currentPatient);
  //   } );
  // }


}
