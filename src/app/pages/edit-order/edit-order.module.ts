import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditOrderRoutingModule } from './edit-order-routing.module';
import { EditOrderComponent } from './edit-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@NgModule({
  declarations: [
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    EditOrderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    OrdersService
  ]
})
export class EditOrderModule { }
