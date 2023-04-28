import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from './actions/send-order.action'
import {OrderServiceStateInterface} from '../types/order-service-state.interface'

export const orderReducer = createReducer(
  initialState,
  on(
    sendOrderAction,
    (state): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    sendOrderSuccessAction,
    (state, {response}): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: false,
      data: response,
    })
  ),
  on(
    sendOrderFailureAction,
    (state, {backendErrors}): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  )
)

export function reducers(state: OrderServiceStateInterface, action: Action) {
  return orderReducer(state, action)
}
