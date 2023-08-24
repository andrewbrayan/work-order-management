import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { IOrder, Notes } from 'src/app/shared/services/orders/models/orders.interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {
  statusSelected: string = '';
  createDate: string = '';
  orderID!: number;

  editForm!: FormGroup
  confirmation: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private orderService: OrdersService, private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      code: ['' , Validators.required],
      name: ['' , [Validators.required, Validators.pattern(/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/)]],
      description: ['' , [Validators.required, Validators.pattern(/^[A-Za-z0-9áéíóúñÁÉÍÓÚÑ\s]+$/)]],
      notes: this.formBuilder.array([
        this.formBuilder.group({
          noteDescription: '',
          noteDate: ''
        })
      ])
    });

    this.route.params.subscribe(params => {
      this.orderID = params['code'];
      this.orderService.getOneOrder(this.orderID).subscribe(([res]) => {
        this.createDate = res.createDate;
        this.statusSelected = res.status;
        this.editForm.setValue({
          code: res.code,
          name: res.name,
          description: res.description,
          notes: []
        });
      });
    });
  }

  isErrorControl(controlName: string, errorName: string): boolean {
    return this.editForm.controls[controlName].hasError(errorName) &&
           this.editForm.controls[controlName].touched
  }

  get notesFormArray(): FormArray {
    return this.editForm.controls['notes'] as FormArray;
  }

  addNote() {
    this.notesFormArray.push(
      this.formBuilder.group({
        noteDescription: '',
        noteDate: ''
      })
    );
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
