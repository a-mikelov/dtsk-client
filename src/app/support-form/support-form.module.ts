import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportFormComponent } from './support-form.component';
import {TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {EffectsModule} from "@ngrx/effects";
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiTextAreaModule
} from "@taiga-ui/kit";
import {StoreModule} from "@ngrx/store";
import {SUPPORT_FORM_FEATURE} from "./store/state";
import {reducer} from "./store/reducer";
import {SendMessageEffect} from "./store/effects/send-message.effect";
import {ReactiveFormsModule} from "@angular/forms";
import {SupportService} from "./services/support.service";

@NgModule({
    declarations: [
        SupportFormComponent
    ],
    exports: [
        SupportFormComponent
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      StoreModule.forFeature(SUPPORT_FORM_FEATURE, reducer),
      EffectsModule.forFeature([SendMessageEffect]),
      TuiInputModule,
      TuiTextfieldControllerModule,
      TuiErrorModule,
      TuiFieldErrorPipeModule,
      TuiInputPhoneModule,
      TuiTextAreaModule,
      TuiCheckboxLabeledModule,
      TuiButtonModule,
    ],
    providers: [SupportService]
})
export class SupportFormModule { }
