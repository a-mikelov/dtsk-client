import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {SupportFormInterface} from '../../types/support-form.interface'
import {ResponseInterface} from '../../types/response.interface'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'

export const sendMessageWebhookAction = createAction(
  ActionTypes.SEND_MESSAGE_WEBHOOK
)

export const sendMessageWebhookSuccessAction = createAction(
  ActionTypes.SEND_MESSAGE_WEBHOOK_SUCCESS
)

export const sendMessageWebhookFailureAction = createAction(
  ActionTypes.SEND_MESSAGE_WEBHOOK_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
