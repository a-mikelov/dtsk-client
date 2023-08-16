import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {ActionTypes} from '../action-types'
import {OrderProductRequestInterface} from '../../types/order-product-request.interface'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'

export const orderProductAction = createAction(
  ActionTypes.ORDER_PRODUCT,
  props<{payload: OrderProductRequestInterface}>()
)

export const orderProductSuccessAction = createAction(
  ActionTypes.ORDER_PRODUCT_SUCCESS,
  props<{response: OrderProductResponseInterface}>()
)

export const orderProductFailureAction = createAction(
  ActionTypes.ORDER_PRODUCT_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
