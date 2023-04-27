import {createFeatureSelector, createSelector} from "@ngrx/store";
import {HERO_FEATURE} from "./state";
import {HeroStateInterface} from "../hero/types/hero-state.interface";
import {ServicesStateInterface} from "../shared/types/services-state.interface";

export const servicesFeatureSelector = createFeatureSelector<HeroStateInterface>(HERO_FEATURE)

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
