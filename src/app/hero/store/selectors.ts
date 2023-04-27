import {createFeatureSelector, createSelector} from "@ngrx/store";
import {HERO_FEATURE} from "./state";
import {HeroStateInterface} from "../types/hero-state.interface";

export const servicesFeatureSelector = createFeatureSelector<HeroStateInterface>(HERO_FEATURE)

export const isLoadingSelector = createSelector(
  servicesFeatureSelector,
  ({isLoading}: HeroStateInterface) => isLoading
)

export const servicesSelector = createSelector(
  servicesFeatureSelector,
  ({data}: HeroStateInterface) => data
)

export const backendErrorsSelector = createSelector(
  servicesFeatureSelector,
  ({backendErrors}: HeroStateInterface) => backendErrors
)
