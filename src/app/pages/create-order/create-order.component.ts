import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IOrder } from 'src/app/shared/services/orders/models/orders.interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup
  confirmation: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private orderService: OrdersService) {
    this.orderForm = this.formBuilder.group({
      code: [`RHK-${this.generateRandomCode()}`, Validators.required],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9áéíóúñÁÉÍÓÚÑ\s]+$/)]]
    });
  }

  ngOnInit(): void {
    this.orderForm.controls['code'].disable()
  }

  generateRandomCode(): string {
    // Generates a random 6-digit number
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }

  isErrorControl(controlName: string, errorName: string): boolean {
    return this.orderForm.controls[controlName].hasError(errorName) && this.orderForm.controls[controlName].touched
  }

  createOrder() {
    this.orderForm.markAllAsTouched();

    if (this.orderForm.valid) {
      if (!this.confirmation) {
        this.confirmation = true;
      } else {
        this.orderForm.controls['code'].enable()

        const order: IOrder = {
          code: this.orderForm.controls['code'].value,
          name: this.orderForm.controls['name'].value,
          description: this.orderForm.controls['description'].value,
          status: 'activa',
          createDate: moment().format('DD-MMMM-YYYY'),
          notes: []
        }

        this.orderService.createOrders(order).subscribe(res => {
          this.success = true;
          this.confirmation = false;

          setTimeout(() => {
            this.success = false;
          }, 2000);

          this.orderForm.reset({
            code: `RHK-${this.generateRandomCode()}`,
            name: '',
            description: ''
          });
        })
      }
    }

  }
}
