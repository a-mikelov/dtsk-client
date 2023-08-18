import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {OrderServiceRequestInterface} from '../../types/order-service-request.interface'
import {OrderServiceResponseInterface} from '../../types/order-service-response.interface'

export const orderServiceAction = createAction(
  ActionTypes.ORDER_SERVICE,
  props<{payload: OrderServiceRequestInterface}>()
)

export const orderServiceSuccessAction = createAction(
  ActionTypes.ORDER_SERVICE_SUCCESS,
  props<{response: OrderServiceResponseInterface}>()
)

export const orderServiceFailureAction = createAction(
  ActionTypes.ORDER_SERVICE_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
