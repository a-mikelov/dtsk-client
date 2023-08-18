import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export interface OrderServiceStateInterface {
  isSubmitting: boolean
  response: any
  backendErrors: BackendErrorsInterface | null
}
