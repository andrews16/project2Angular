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
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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

  displayedColumns: string[];

  currentUser: User;

  constructor(private rxService: RxService,
      private patientService: PatientService,
      private modalService: NgbModal,
      private userService: UserService) {
        this.currentUser = this.userService.currentUser;
      }

  ngOnInit() {
    this.dataSource = new RxTableDataSource(this.sort, this.rxService);
    this.patient = this.patientService.currentPatient;
    this.patientService.$patient.subscribe( (data) =>
    this.patient = data
    );
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    this.displayedColumns = this.currentUser.role === 'DOCTOR' ?
        ['name', 'dose', 'frequency', 'dateStarted', 'remove']
        : ['name', 'dose', 'frequency', 'dateStarted'];
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


}
