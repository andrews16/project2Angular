import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ArchiveTableDataSource } from './archive-table-datasource';

@Component({
  selector: 'app-archive-table',
  templateUrl: './archive-table.component.html',
  styleUrls: ['./archive-table.component.css'],
})
export class ArchiveTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ArchiveTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ArchiveTableDataSource(this.paginator, this.sort);
  }
}
