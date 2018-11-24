import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { RxTableDataSource } from './rx-table-datasource';
import { RxService } from 'src/app/services/rx.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Rx } from 'src/app/models/rx';

@Component({
  selector: 'app-rx-table',
  templateUrl: './rx-table.component.html',
  styleUrls: ['./rx-table.component.css'],
})
export class RxTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RxTableDataSource;
  // For Modal
  closeResult: string;

  patient: Patient;
  removalCandidate: Rx;

  constructor(private rxService: RxService, private modalService: NgbModal, private patientService: PatientService) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'dose', 'frequency', 'dateStarted', 'remove'] ;

  ngOnInit() {
    this.dataSource = new RxTableDataSource(this.sort, this.rxService);
    this.patient = this.patientService.currentPatient;
  }


  candidate(rx: any) {
    //this.removalCandidate = rx;
    console.log(rx);
    console.log('ONE (rx-table)');
  }
  // Modal Methods :
  open(content) {
    console.log('TWO');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'remove') {
      this.rxService.remove(this.removalCandidate.id);
      return 'done';
    } else {
      return  `with: ${reason}`;
    }
  }

}
