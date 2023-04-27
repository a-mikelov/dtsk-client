import {Action, createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import {getServicesAction, getServicesFailureAction, getServiceSuccessAction} from "./actions/get-services.action";
import {HeroStateInterface} from "../types/hero-state.interface";

export const heroReducer = createReducer(
  initialState,
  on(getServicesAction, (state): HeroStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getServiceSuccessAction, (state, {data}) => ({
    ...state,
    isLoading: false,
    data
  })),
  on(getServicesFailureAction, (state, {backendErrors}) => ({
    ...state,
    isLoading: false,
    backendErrors
  }))
)

export function reducers(state: HeroStateInterface, action: Action) {
  return heroReducer(state, action)
}
