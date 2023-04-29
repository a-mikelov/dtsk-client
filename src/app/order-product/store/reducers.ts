import {OrderProductStateInterface} from '../types/order-product-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from './actions/send-product.action'

export const orderReducer = createReducer(
  initialState,
  on(
    sendOrderAction,
    (state): OrderProductStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    sendOrderSuccessAction,
    (state, {response}): OrderProductStateInterface => ({
      ...state,
      isSubmitting: false,
      response,
    })
  ),
  on(
    sendOrderFailureAction,
    (state, {backendErrors}): OrderProductStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  )
)

export function reducers(state: OrderProductStateInterface, action: Action) {
  return orderReducer(state, action)
}
