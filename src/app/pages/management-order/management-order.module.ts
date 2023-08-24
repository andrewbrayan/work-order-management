import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementOrderRoutingModule } from './management-order-routing.module';
import { ManagementOrderComponent } from './management-order.component';
import { FormsModule } from '@angular/forms';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ManagementOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ManagementOrderRoutingModule,
    HttpClientModule
  ],
  providers: [
    OrdersService
  ]
})
export class ManagementOrderModule { }
