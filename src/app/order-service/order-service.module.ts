import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {OrderServiceComponent} from './order-service.component'
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core'
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit'
import {ReactiveFormsModule} from '@angular/forms'
import {StepOneComponent} from './components/step-one/step-one.component'
import {StepTwoComponent} from './components/step-two/step-two.component'
import {OrderDetailsModule} from '../shared/components/order-details/order-details.module'
import {ClientModule} from '../shared/components/client/client.module'
import {StoreModule} from '@ngrx/store'
import {ORDER_SERVICE_FEATURE} from './store/state'
import {reducers} from './store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {SendOrderEffect} from './store/effects/send-order.effect'
import {ServicesService} from '../shared/services/services.service'

@NgModule({
  declarations: [OrderServiceComponent, StepOneComponent, StepTwoComponent],
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
    TuiTextAreaModule,
    StoreModule.forFeature(ORDER_SERVICE_FEATURE, reducers),
    EffectsModule.forFeature([SendOrderEffect]),
  ],
  providers: [ServicesService],
})
export class OrderServiceModule {}