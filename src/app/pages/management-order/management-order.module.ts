import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementOrderRoutingModule } from './management-order-routing.module';
import { ManagementOrderComponent } from './management-order.component';


@NgModule({
  declarations: [
    ManagementOrderComponent
  ],
  imports: [
    CommonModule,
    ManagementOrderRoutingModule
  ]
})
export class ManagementOrderModule { }
