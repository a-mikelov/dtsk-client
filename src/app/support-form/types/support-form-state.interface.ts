import {ResponseInterface} from './response.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export interface SupportFormStateInterface {
  isSubmitting: boolean
  isPristine: boolean
  response: ResponseInterface | null
  backendErrors: BackendErrorsInterface | null
}
