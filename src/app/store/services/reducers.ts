import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getServicesAction,
  getServicesFailureAction,
  getServiceSuccessAction,
} from './actions/get-services.action'
import {HeroStateInterface} from '../../hero/types/hero-state.interface'
import {ServicesStateInterface} from '../../shared/types/services-state.interface'

export const heroReducer = createReducer(
  initialState,
  on(
    getServicesAction,
    (state): ServicesStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getServiceSuccessAction,
    (state, {data}): ServicesStateInterface => ({
      ...state,
      isLoading: false,
      data,
    })
  ),
  on(
    getServicesFailureAction,
    (state, {backendErrors}): ServicesStateInterface => ({
      ...state,
      isLoading: false,
      backendErrors,
    })
  )
)

export function reducers(state: HeroStateInterface, action: Action) {
  return heroReducer(state, action)
}
