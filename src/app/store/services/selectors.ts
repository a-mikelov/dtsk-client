import {createFeatureSelector, createSelector} from '@ngrx/store'
import {HeroStateInterface} from '../../hero/types/hero-state.interface'
import {ServicesStateInterface} from '../../shared/types/services-state.interface'
import {SERVICES_FEATURE} from './state'

export const servicesFeatureSelector =
  createFeatureSelector<HeroStateInterface>(SERVICES_FEATURE)

export const isLoadingSelector = createSelector(
  servicesFeatureSelector,
  ({isLoading}: ServicesStateInterface) => isLoading
)

export const servicesSelector = createSelector(
  servicesFeatureSelector,
  ({data}: ServicesStateInterface) => data
)

export const backendErrorsSelector = createSelector(
  servicesFeatureSelector,
  ({backendErrors}: ServicesStateInterface) => backendErrors
)
