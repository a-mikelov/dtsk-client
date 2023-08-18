import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {OrderServiceResponseInterface} from '../../types/order-service-response.interface'

export const orderServiceWebhookAction = createAction(
  ActionTypes.ORDER_SERVICE_WEBHOOK,
  props<{response: OrderServiceResponseInterface}>()
)

export const orderServiceWebhookSuccessAction = createAction(
  ActionTypes.ORDER_SERVICE_WEBHOOK_SUCCESS
)

export const orderServiceWebhookFailureAction = createAction(
  ActionTypes.ORDER_SERVICE_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
