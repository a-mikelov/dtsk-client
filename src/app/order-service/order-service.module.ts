import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderServiceComponent } from './order-service.component';
import {TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import {OrderDetailsModule} from "../shared/components/order-details/order-details.module";



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
        OrderDetailsModule
    ]
})
export class OrderServiceModule { }
