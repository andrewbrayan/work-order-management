import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseviewComponent } from './baseview.component';

const routes: Routes = [
  {
    path: '',
    component: BaseviewComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../principal-home/principal-home.module').then(m => m.PrincipalHomeModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../management-order/management-order.module').then(m => m.ManagementOrderModule)
      },
      {
        path: 'create',
        loadChildren: () => import('../create-order/create-order.module').then(m => m.CreateOrderModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('../edit-order/edit-order.module').then(m => m.EditOrderModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseviewRoutingModule { }
