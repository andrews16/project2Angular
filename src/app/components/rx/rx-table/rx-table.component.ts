import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { RxTableDataSource } from './rx-table-datasource';
import { RxCommunicationService } from 'src/app/services/rx-communication.service';

@Component({
  selector: 'app-rx-table',
  templateUrl: './rx-table.component.html',
  styleUrls: ['./rx-table.component.css'],
})
export class RxTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RxTableDataSource;

  constructor(private rxComm: RxCommunicationService) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'dose', 'frequency', 'dateStarted'] ;

  ngOnInit() {
    this.dataSource = new RxTableDataSource(this.sort, this.rxComm);
  }
}
