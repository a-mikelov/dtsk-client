import {OrderProductStateInterface} from '../types/order-product-state.interface'
import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ORDER_SERVICE_FEATURE} from '../../order-service/store/state'

export const orderProductFeatureSelector =
  createFeatureSelector<OrderProductStateInterface>(ORDER_SERVICE_FEATURE)

export const isSubmittingSelector = createSelector(
  orderProductFeatureSelector,
  (state: OrderProductStateInterface) => state.isSubmitting
)

export const responseSelector = createSelector(
  orderProductFeatureSelector,
  (state: OrderProductStateInterface) => state.response
)

export const backendErrorsSelector = createSelector(
  orderProductFeatureSelector,
  (state: OrderProductStateInterface) => state.backendErrors
)
