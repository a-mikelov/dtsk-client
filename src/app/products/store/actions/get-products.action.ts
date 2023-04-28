import {createAction, props} from '@ngrx/store'
import {GetProductsResponseInterface} from '../../types/get-products-response.interface'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {ActionTypes} from '../action-types'

export const getProductsAction = createAction(ActionTypes.GET_PRODUCTS)
export const getProductsSuccessAction = createAction(
  ActionTypes.GET_PRODUCTS_SUCCESS,
  props<{data: GetProductsResponseInterface}>()
)
export const getProductsFailureAction = createAction(
  ActionTypes.GET_PRODUCTS_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
