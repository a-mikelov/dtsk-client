import {Action, createReducer, on} from '@ngrx/store'
import {clearFormAction} from './actions/clear-form.action'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from './actions/send-message.action'
import {SupportFormStateInterface} from '../types/support-form-state.interface'
import {initialState} from './state'
import {
  sendMessageWebhookFailureAction,
  sendMessageWebhookSuccessAction,
} from './actions/send-message-webhook.action'

const sendMessageReducer = createReducer(
  initialState,
  on(
    sendMessageAction,
    (state): SupportFormStateInterface => ({
      ...state,
      isPristine: false,
      isSubmitting: true,
    })
  ),
  on(
    sendMessageSuccessAction,
    (state, {response}): SupportFormStateInterface => ({
      ...state,
      isSubmitting: false,
      response,
    })
  ),
  on(
    sendMessageFailureAction,
    (state, {backendErrors}): SupportFormStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  ),
  on(
    sendMessageWebhookSuccessAction,
    (state): SupportFormStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    sendMessageWebhookFailureAction,
    (state, {backendErrors}): SupportFormStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  ),
  on(clearFormAction, () => ({
    ...initialState,
  }))
)

export function reducer(state: SupportFormStateInterface, action: Action) {
  return sendMessageReducer(state, action)
}
