import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseviewRoutingModule } from './baseview-routing.module';
import { BaseviewComponent } from './baseview.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    BaseviewComponent
  ],
  imports: [
    CommonModule,
    BaseviewRoutingModule,
    ComponentsModule
  ]
})
export class BaseviewModule { }
