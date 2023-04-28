import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types";
import {GetServicesResponseInterface} from "../../../shared/services/get-services-response.interface";
import {BackendErrorsInterface} from "../../../shared/types/backend-errors.interface";

export const getServicesAction = createAction(ActionTypes.GET_SERVICES)
export const getServiceSuccessAction = createAction(
  ActionTypes.GET_SERVICES_SUCCESS,
  props<{data: GetServicesResponseInterface}>()
  )
export const getServicesFailureAction = createAction(ActionTypes.GET_SERVICES_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>())
