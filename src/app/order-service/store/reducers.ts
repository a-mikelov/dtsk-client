import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  orderServiceAction,
  orderServiceFailureAction,
  orderServiceSuccessAction,
} from './actions/order-service.action'
import {OrderServiceStateInterface} from '../types/order-service-state.interface'
import {
  orderServiceWebhookFailureAction,
  orderServiceWebhookSuccessAction,
} from './actions/order-service-webhook.action'

export const orderReducer = createReducer(
  initialState,
  on(
    orderServiceAction,
    (state): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    orderServiceSuccessAction,
    (state, {response}): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: false,
      response,
    })
  ),
  on(
    orderServiceFailureAction,
    (state, {backendErrors}): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  ),
  on(
    orderServiceWebhookSuccessAction,
    (state): OrderServiceStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    orderServiceWebhookFailureAction,
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
