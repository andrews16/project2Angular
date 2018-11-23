import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveTableDataSource } from './archive-table-datasource';
import { RxService } from 'src/app/services/rx.service';

@Component({
  selector: 'app-archive-table',
  templateUrl: './archive-table.component.html',
  styleUrls: ['./archive-table.component.css'],
})
export class ArchiveTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveTableDataSource;

  constructor(private rxComm: RxService) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns = ['name', 'dose', 'frequency', 'dateStarted', 'dateEnded'] ;

  ngOnInit() {
    this.dataSource = new ArchiveTableDataSource(this.paginator, this.sort, this.rxComm);
//    this.dataSource = new ArchiveTableDataSource(this.paginator, this.sort);
  }
}
