import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {SupportFormInterface} from '../../types/support-form.interface'
import {ResponseInterface} from '../../types/response.interface'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {SupportFormResponseInterface} from '../../types/support-form-response.interface'

export const sendMessageAction = createAction(
  ActionTypes.SEND_MESSAGE,
  props<{payload: any}>()
)

export const sendMessageSuccessAction = createAction(
  ActionTypes.SEND_MESSAGE_SUCCESS,
  props<{response: SupportFormResponseInterface}>()
)

export const sendMessageFailureAction = createAction(
  ActionTypes.SEND_MESSAGE_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
