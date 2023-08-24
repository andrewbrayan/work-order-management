import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementOrderComponent } from './management-order.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementOrderRoutingModule { }
