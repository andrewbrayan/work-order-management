import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrder } from 'src/app/shared/services/orders/models/orders.interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  statusSelected!: string;
  editForm!: FormGroup
  confirmation: boolean = false;
  success: boolean = false;
  orderID!: number;
  order!: IOrder;

  constructor(private formBuilder: FormBuilder, private orderService: OrdersService, private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      code: ['' , Validators.required],
      name: ['' , [Validators.required, Validators.pattern(/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/)]],
      description: ['' , [Validators.required, Validators.pattern(/^[A-Za-z0-9áéíóúñÁÉÍÓÚÑ\s]+$/)]],
    });

    this.route.params.subscribe(params => {
      this.orderID = params['id'];
      this.orderService.getOneOrder(this.orderID).subscribe(res => {
        console.log('res', res)
        this.order = res
        this.statusSelected = res.status
        this.editForm.setValue({
          code: res.code,
          name: res.name,
          description: res.description
        })
      });
    });
  }

  isErrorControl(controlName: string, errorName: string): boolean {
    return this.editForm.controls[controlName].hasError(errorName) &&
           this.editForm.controls[controlName].touched
  }

  editOrder() {
    this.editForm.markAllAsTouched();

    if (this.editForm.valid) {
      if (!this.confirmation) {
        this.confirmation = true;
      } else {
        this.editForm.controls['code'].enable()

        const order: IOrder = this.editForm.value

        this.orderService.createOrders(order).subscribe(res => {
          this.success = true;
          this.confirmation = false;

          setTimeout(() => {
            this.success = false;
          }, 2000);

          this.editForm.reset();
        })
      }
    }

  }
}
