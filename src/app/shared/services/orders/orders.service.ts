import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { IOrder } from './models/orders.interfaces';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get<IOrder[]>(`${environment.API_URL}/orders`)
  }

  getOneOrder(id: number) {
    return this.httpClient.get<IOrder[]>(`${environment.API_URL}/orders?code=${id}`)
  }

  createOrders(order: IOrder) {
    return this.httpClient.post(`${environment.API_URL}/orders`, order)
  }

  editOrders(order: IOrder) {
    return this.httpClient.patch(`${environment.API_URL}/orders/${order.id}`, order)
  }
}
