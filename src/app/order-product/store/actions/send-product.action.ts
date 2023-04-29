import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {ActionTypes} from '../action-types'

export const sendOrderAction = createAction(
  ActionTypes.SEND_ORDER,
  props<{order: any}>()
)

export const sendOrderSuccessAction = createAction(
  ActionTypes.SEND_ORDER_SUCCESS,
  props<{response: any}>()
)

export const sendOrderFailureAction = createAction(
  ActionTypes.SEND_ORDER_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
