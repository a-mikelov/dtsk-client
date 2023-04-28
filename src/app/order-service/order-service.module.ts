import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderServiceComponent } from './order-service.component';
import {TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiTextAreaModule
} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import {OrderDetailsModule} from "../shared/components/order-details/order-details.module";
import {ClientModule} from "../shared/components/client/client.module";



@NgModule({
  declarations: [
    OrderServiceComponent,
    StepOneComponent,
    StepTwoComponent
  ],
  imports: [
    CommonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    ReactiveFormsModule,
    OrderDetailsModule,
    ClientModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
    TuiTextAreaModule
  ]
})
export class OrderServiceModule { }
