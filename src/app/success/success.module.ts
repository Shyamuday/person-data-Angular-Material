import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessRoutingModule } from './success-routing.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SuccessRoutingModule
  ]
})
export class SuccessModule { }
