import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrderRoutingModule } from './create-order-routing.module';
import { CreateOrderComponent } from './create-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CreateOrderComponent
  ],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    OrdersService
  ]
})
export class CreateOrderModule { }
