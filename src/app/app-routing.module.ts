import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { BillingComponent } from './components/billing/billing/billing.component';
import { RxComponent } from './components/rx/rx/rx.component';
import { VisitsComponent } from './components/visits/visits/visits.component';

const routes: Routes = [{
  component: LoginComponent,
  path: 'login',
}, {
  component: BillingComponent,
  path: 'billing',
  }, {
  component: RxComponent,
  path: 'rx'
}, {
  component: VisitsComponent,
  path: 'visits'
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
