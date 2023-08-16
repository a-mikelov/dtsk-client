import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'

export const orderProductWebhookAction = createAction(
  ActionTypes.ORDER_PRODUCT_WEBHOOK,
  props<{response: OrderProductResponseInterface}>()
)

export const orderProductWebhookSuccessAction = createAction(
  ActionTypes.ORDER_PRODUCT_WEBHOOK_SUCCESS,
  props<{response: OrderProductResponseInterface}>()
)

export const orderProductWebhookFailureAction = createAction(
  ActionTypes.ORDER_PRODUCT_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
