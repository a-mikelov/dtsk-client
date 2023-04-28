import {OrderServiceStateInterface} from '../types/order-service-state.interface'

export const ORDER_SERVICE_FEATURE = 'orderService'

export const initialState: OrderServiceStateInterface = {
  isSubmitting: false,
  data: null,
  backendErrors: null,
}
