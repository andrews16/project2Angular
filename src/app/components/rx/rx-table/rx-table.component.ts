import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { RxTableDataSource } from './rx-table-datasource';
import { RxService } from 'src/app/services/rx.service';

@Component({
  selector: 'app-rx-table',
  templateUrl: './rx-table.component.html',
  styleUrls: ['./rx-table.component.css'],
})
export class RxTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RxTableDataSource;

  constructor(private rxComm: RxService) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'dose', 'frequency', 'dateStarted'] ;

  ngOnInit() {
    this.dataSource = new RxTableDataSource(this.sort, this.rxComm);
  }

  remove(id: number) {
    this.rxComm.remove(id);
  }
}
