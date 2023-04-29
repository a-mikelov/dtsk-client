import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {OrderProductComponent} from './order-product.component'
import {StepOneComponent} from './components/step-one/step-one.component'
import {StepTwoComponent} from './components/step-two/step-two.component'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {OrderDetailsModule} from '../shared/components/order-details/order-details.module'
import {ReactiveFormsModule} from '@angular/forms'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {ClientModule} from '../shared/components/client/client.module'
import {OrderReportModule} from '../shared/components/order-report/order-report.module'

@NgModule({
  declarations: [
    OrderProductComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  imports: [
    CommonModule,
    TuiCheckboxLabeledModule,
    OrderDetailsModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiInputCountModule,
    ClientModule,
    TuiTextAreaModule,
    OrderReportModule,
    TuiButtonModule,
  ],
})
export class OrderProductModule {}
