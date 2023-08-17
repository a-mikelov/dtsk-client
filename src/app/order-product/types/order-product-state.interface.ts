import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'
import {OrderProductResponseInterface} from './order-product-response.interface'

export interface OrderProductStateInterface {
  isSubmitting: boolean
  response: OrderProductResponseInterface
  backendErrors: BackendErrorsInterface | null
}
