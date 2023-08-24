import { Component, OnDestroy } from '@angular/core';
import { IOrder } from 'src/app/shared/services/orders/models/orders.interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-management-order',
  templateUrl: './management-order.component.html',
  styleUrls: ['./management-order.component.scss']
})
export class ManagementOrderComponent implements OnDestroy {
  filterSelected: string = 'all';
  orders: Observable<IOrder[]>;

  constructor(private orderService: OrdersService) {
    this.orders = this.orderService.getOrders();
  }

  searchOrder(input: string) {
    if (input.length > 4) {
      this.orders = this.orderService.getOrders().pipe(
        map(orders =>
          orders.filter(order =>
            order.code.toLowerCase().includes(input.toLowerCase()) ||
            order.name.toLowerCase().includes(input.toLowerCase())
          )
        )
      )
    } else if (input.length === 0) {
      this.orders = this.orderService.getOrders();
    }
  }

  updateFilter() {
    if (this.filterSelected === 'all') {
      this.orders = this.orderService.getOrders();
    } else {
      this.orders = this.orderService.getOrders().pipe(
        map(orders =>
          orders.filter(order => order.status === this.filterSelected)
        )
      )
    }
  }

  ngOnDestroy(): void {

  }
}
