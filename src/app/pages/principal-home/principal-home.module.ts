import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalHomeRoutingModule } from './principal-home-routing.module';
import { PrincipalHomeComponent } from './principal-home.component';


@NgModule({
  declarations: [
    PrincipalHomeComponent
  ],
  imports: [
    CommonModule,
    PrincipalHomeRoutingModule
  ]
})
export class PrincipalHomeModule { }
