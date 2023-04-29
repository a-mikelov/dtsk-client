import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {OrderProductComponent} from './order-product.component'
import {StepOneComponent} from './components/step-one/step-one.component'
import {StepTwoComponent} from './components/step-two/step-two.component'
import {StepThreeComponent} from './components/step-three/step-three.component'
import {
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
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
import {ProductsService} from '../shared/services/products.service'
import {StoreModule} from '@ngrx/store'
import {ORDER_PRODUCT_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {SendOrderEffect} from './store/effects/send-order.effect'

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
    StoreModule.forFeature(ORDER_PRODUCT_FEATURE, reducers),
    EffectsModule.forFeature([SendOrderEffect]),
    TuiDataListWrapperModule,
    TuiComboBoxModule,
  ],
  providers: [ProductsService],
})
export class OrderProductModule {}
