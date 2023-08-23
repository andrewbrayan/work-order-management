import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOrderRoutingModule } from './edit-order-routing.module';
import { EditOrderComponent } from './edit-order.component';


@NgModule({
  declarations: [
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    EditOrderRoutingModule
  ]
})
export class EditOrderModule { }
