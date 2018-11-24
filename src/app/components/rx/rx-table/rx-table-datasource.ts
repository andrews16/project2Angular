import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subscription } from 'rxjs';
import { Rx } from 'src/app/models/rx';
import { OnInit, OnDestroy } from '@angular/core';
import { RxService } from 'src/app/services/rx.service';

// TODO: Replace this with your own data model type
// export interface RxTableItem {
//   // name: string;
//   // id: number;
//   // (id: number,
//   //   name: string,
//   //   dateStarted: string,
//   //   dateEnded: string,
//   //   dose: string,
//   //   frequency: string,
// }


/**
 * Data source for the RxTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RxTableDataSource extends DataSource<Rx> implements OnInit, OnDestroy {

  data: Rx[];
  listSubscription: Subscription;

  constructor(private sort: MatSort, private rxService: RxService) {
    super();
    this.data = this.rxService.currentRxList;
    this.listSubscription = rxService.$rxList.subscribe( (data) => {
      this.data = data;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.listSubscription) {
      this.listSubscription.unsubscribe();
    }
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Rx[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getSortedData([...this.data]);
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Rx[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
