import {
  getProductsAction,
  getProductsFailureAction,
  getProductsSuccessAction,
} from './actions/get-products.action'
import {ProductsStateInterface} from '../types/products-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'

export const productsReducer = createReducer(
  initialState,
  on(
    getProductsAction,
    (state): ProductsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getProductsSuccessAction,
    (state, {data}): ProductsStateInterface => ({
      ...state,
      isLoading: false,
      data,
    })
  ),
  on(
    getProductsFailureAction,
    (state, {backendErrors}): ProductsStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors,
    })
  )
)

export function reducers(state: ProductsStateInterface, action: Action) {
  return productsReducer(state, action)
}
