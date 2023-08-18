import {ResponseInterface} from './response.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'
import {SupportFormResponseInterface} from './support-form-response.interface'

export interface SupportFormStateInterface {
  isSubmitting: boolean
  isPristine: boolean
  response: SupportFormResponseInterface | null
  backendErrors: BackendErrorsInterface | null
}
