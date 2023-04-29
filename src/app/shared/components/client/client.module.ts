import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ClientComponent} from './client.component'
import {ReactiveFormsModule} from '@angular/forms'
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core'
import {
  TuiFieldErrorPipeModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiInputTimeModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputTimeModule,
    TuiTextAreaModule,
    TuiInputPhoneModule,
  ],
  exports: [ClientComponent],
})
export class ClientModule {}
