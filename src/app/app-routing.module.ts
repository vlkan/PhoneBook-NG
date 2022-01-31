import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [{ path: '', pathMatch:"full", component: CustomerComponent },
{ path: 'customers', component: CustomerComponent },
{ path: 'customers/search/:searchText', component: CustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
