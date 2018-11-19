import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class MatDesignModule { }
