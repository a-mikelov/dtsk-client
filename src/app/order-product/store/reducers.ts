import {OrderProductStateInterface} from '../types/order-product-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  orderProductAction,
  orderProductFailureAction,
  orderProductSuccessAction,
} from './actions/order-product.action'

export const orderReducer = createReducer(
  initialState,
  on(
    orderProductAction,
    (state): OrderProductStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    orderProductSuccessAction,
    (state, {response}): OrderProductStateInterface => ({
      ...state,
      isSubmitting: false,
      response,
    })
  ),
  on(
    orderProductFailureAction,
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
