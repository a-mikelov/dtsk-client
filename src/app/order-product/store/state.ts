import {OrderProductStateInterface} from '../types/order-product-state.interface'

export const ORDER_PRODUCT_FEATURE = 'orderProduct'

export const initialState: OrderProductStateInterface = {
  isSubmitting: false,
  response: null,
  backendErrors: null,
}
