import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputTimeModule,
  TuiTextAreaModule
} from "@taiga-ui/kit";
import {UtilsService} from "../../services/utils.service";

@NgModule({
  declarations: [
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputDateModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputTimeModule,
    TuiTextAreaModule
  ],
  exports: [
    OrderDetailsComponent
  ],
  providers: [UtilsService]
})
export class OrderDetailsModule { }
