import {GetServicesResponseInterface} from '../../shared/services/get-services-response.interface'
import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface'

export interface HeroStateInterface {
  isLoading: boolean
  data: GetServicesResponseInterface | null
  backendErrors: BackendErrorsInterface | null
}
