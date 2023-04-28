import {PRODUCTS_FEATURE} from './state'
import {createFeatureSelector, createSelector} from '@ngrx/store'
import {ProductsStateInterface} from '../types/products-state.interface'

export const productsFeatureSelector =
  createFeatureSelector<ProductsStateInterface>(PRODUCTS_FEATURE)

export const isLoadingSelector = createSelector(
  productsFeatureSelector,
  ({isLoading}: ProductsStateInterface) => isLoading
)

export const productsSelector = createSelector(
  productsFeatureSelector,
  ({data}: ProductsStateInterface) => data
)

export const backendErrorsSelector = createSelector(
  productsFeatureSelector,
  ({backendErrors}: ProductsStateInterface) => backendErrors
)
