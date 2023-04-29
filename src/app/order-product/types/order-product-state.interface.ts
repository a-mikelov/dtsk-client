import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export interface OrderProductStateInterface {
  isSubmitting: boolean
  response: any
  backendErrors: BackendErrorsInterface | null
}
