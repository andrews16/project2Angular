import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BillingComponent } from './components/billing/billing/billing.component';
import { LoginComponent } from './components/login/login/login.component';
import { RxComponent } from './components/rx/rx/rx.component';
import { VisitsComponent } from './components/visits/visits/visits.component';
import { LayoutComponent } from './components/layout/layout/layout.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgbModule, NgbModalModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectPatientComponent } from './components/shared/select-patient/select-patient.component';
import { PatientRxComponent } from './components/rx/patient-rx/patient-rx.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RxTableComponent } from './components/rx/rx-table/rx-table.component';
import { MatDesignModule } from './mat-design/mat-design.module';
import { ArchiveTableComponent } from './components/rx/archive-table/archive-table.component';
import { MatTableModule, MatPaginatorModule,
  MatSortModule, MatButtonModule, MatDialogModule,
 MatExpansionModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule } from '@angular/material';
import { DoctorViewRxComponent } from './components/rx/doctor-view-rx/doctor-view-rx.component';
import { NavComponent } from './components/nav/nav.component';
import { TestingComponent } from './testing/testing.component';
import { SearchComponent } from './components/rx/search/search.component';
import { RxConceptPipe } from './pipes/rx-concept.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NewRxComponent } from './components/rx/new-rx/new-rx.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    LoginComponent,
    RxComponent,
    VisitsComponent,
    LayoutComponent,
    SelectPatientComponent,
    PatientRxComponent,
    LoadingComponent,
    RxTableComponent,
    ArchiveTableComponent,
    DoctorViewRxComponent,
    NavComponent,
    TestingComponent,
    SearchComponent,
    RxConceptPipe,
    DashboardComponent,
    NewRxComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDesignModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatCardModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
