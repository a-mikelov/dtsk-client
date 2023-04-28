import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export interface OrderServiceStateInterface {
  isSubmitting: boolean
  data: any
  backendErrors: BackendErrorsInterface | null
}
