import {ServicesStateInterface} from '../../shared/types/services-state.interface'

export const SERVICES_FEATURE = 'services'

export const initialState: ServicesStateInterface = {
  isLoading: false,
  data: null,
  backendErrors: null,
}
