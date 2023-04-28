import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {ServiceInterface} from "../../shared/services/service.interface";
import {BackendErrorsInterface} from "../../shared/types/backend-errors.interface";
import {MetaInterface} from "../../shared/services/meta-interface";
import {HeroStateInterface} from "../../hero/types/hero-state.interface";
import {ServicesStateInterface} from "../../shared/types/services-state.interface";

export const HERO_FEATURE = 'hero'

export const initialState: ServicesStateInterface = {
  isLoading: false,
  data: null,
  backendErrors: null,
};
