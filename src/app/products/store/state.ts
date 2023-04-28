import {ProductsStateInterface} from '../types/products-state.interface'

export const PRODUCTS_FEATURE = 'products'

export const initialState: ProductsStateInterface = {
  isLoading: false,
  data: null,
  backendErrors: null,
}
