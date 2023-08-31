import {ServicesStateInterface} from '../shared/types/services-state.interface'
import {globalReducer} from './global/reducer'
import {GLOBAL_FEATURE} from './global/state'
import {GlobalStateInterface} from './global/types/global-state.interface'
import {servicesReducer} from './services/reducers'
import {SERVICES_FEATURE} from './services/state'

export interface State {
  [GLOBAL_FEATURE]: GlobalStateInterface
  [SERVICES_FEATURE]: ServicesStateInterface
}

export const reducers = {
  [GLOBAL_FEATURE]: globalReducer,
  [SERVICES_FEATURE]: servicesReducer,
}
