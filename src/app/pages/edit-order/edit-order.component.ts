import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
  orderCode!: string;
  orderNotes: Notes[] = [];

  editForm!: FormGroup
  notesForm!: FormGroup
  confirmation: boolean = false;
  success: boolean = false;

  constructor(private formBuilder: FormBuilder, private orderService: OrdersService, private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      code: ['' , Validators.required],
      name: ['' , [Validators.required, Validators.pattern(/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/)]],
      description: ['' , [Validators.required, Validators.pattern(/^[A-Za-z0-9áéíóúñÁÉÍÓÚÑ\s]+$/)]],
    });

    this.notesForm = this.formBuilder.group({
      notes: this.formBuilder.array([
        this.formBuilder.group({
          description: ['', Validators.required],
          date: ['', Validators.required]
        })
      ])
    });

    this.route.params.subscribe(params => {
      this.orderCode = params['code'];
      this.orderService.getOneOrder(this.orderCode).subscribe(([res]) => {
        console.log('res', res)
        this.createDate = res.createDate;
        this.statusSelected = res.status;
        this.orderNotes = res.notes;
        this.orderID = res.id!;

        this.editForm.setValue({
          code: res.code,
          name: res.name,
          description: res.description
        });
      });
    });
  }

  ngOnInit(): void {
    this.editForm.controls['code'].disable()
  }

  isErrorControl(controlName: string, errorName: string): boolean {
    return this.editForm.controls[controlName].hasError(errorName) && this.editForm.controls[controlName].touched
  }

  get notes() {
    return this.notesForm.controls["notes"] as FormArray<
      FormGroup<{
        description: FormControl<string | null>;
        date: FormControl<string | null>;
      }>
    >;
  }

  addNote() {
    const noteForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    })

    this.notes.push(noteForm);
  }

  saveNote() {
    this.notesForm.markAllAsTouched()

    if (this.notesForm.valid) {
      this.orderNotes = [...this.orderNotes, ...this.notesForm.controls['notes'].value];
    }
  }

  editOrder() {
    this.editForm.markAllAsTouched();

    if (this.editForm.valid) {
      if (!this.confirmation) {
        this.confirmation = true;
      } else {
        this.editForm.controls['code'].enable()

        const order: IOrder = {
          ...this.editForm.value,
          status: this.statusSelected,
          notes: this.orderNotes,
          id: this.orderID
        }

        this.orderService.editOrders(order).subscribe(res => {
          this.success = true;
          this.confirmation = false;

          setTimeout(() => {
            this.success = false;
          }, 2000);

          this.orderService.getOneOrder(this.orderCode).subscribe(([res]) => {
            this.createDate = res.createDate;
            this.statusSelected = res.status;
            this.orderNotes = res.notes;
            this.orderID = res.id!;

            this.notesForm.reset([
              this.formBuilder.group({
                description: ['', Validators.required],
                date: ['', Validators.required]
              })
            ]);

            this.editForm.setValue({
              code: res.code,
              name: res.name,
              description: res.description
            });
          });
        })
      }
    }

  }
}
