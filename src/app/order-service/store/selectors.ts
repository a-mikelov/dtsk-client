import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ORDER_SERVICE_FEATURE} from './state'
import {OrderServiceStateInterface} from '../types/order-service-state.interface'

export const orderServiceFeatureSelector =
  createFeatureSelector<OrderServiceStateInterface>(ORDER_SERVICE_FEATURE)

export const isSubmittingSelector = createSelector(
  orderServiceFeatureSelector,
  (state: OrderServiceStateInterface) => state.isSubmitting
)

export const responseSelector = createSelector(
  orderServiceFeatureSelector,
  (state: OrderServiceStateInterface) => state.response
)

export const backendErrorsSelector = createSelector(
  orderServiceFeatureSelector,
  (state: OrderServiceStateInterface) => state.backendErrors
)
