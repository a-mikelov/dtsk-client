import {Inject, Injectable, Injector} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {sendMessageSuccessAction} from '../actions/send-message.action'
import {SupportService} from '../../services/support.service'
import {catchError, concatMap, map, of, switchMap, take, tap} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {TuiDialogService} from '@taiga-ui/core'
import {SupportFormResponseInterface} from '../../types/support-form-response.interface'
import {
  sendMessageWebhookFailureAction,
  sendMessageWebhookSuccessAction,
} from '../actions/send-message-webhook.action'
import {HttpErrorResponse} from '@angular/common/http'
import {responseSelector} from '../selectors'

@Injectable()
export class SendMessageWebhookEffect {
  sendWebhook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessageSuccessAction),
      switchMap(({response}) => {
        return this.supportService
          .sendMessageWebhook('Заказ услуги', response)
          .pipe(
            map(() => {
              return sendMessageWebhookSuccessAction()
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                sendMessageWebhookFailureAction({
                  backendErrors: errorResponse.error.error,
                })
              )
            })
          )
      })
    )
  )

  success$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendMessageWebhookSuccessAction),
        switchMap(() => {
          return this.store.pipe(select(responseSelector)).pipe(
            switchMap((response: SupportFormResponseInterface) => {
              return this.supportService.updateMessage(response.data.id, {
                name: response.data.attributes.name,
                email: response.data.attributes.email,
                phone: response.data.attributes.phone,
                message: response.data.attributes.message,
              })
            })
          )
        }),
        tap((data) => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Ваше сообщение отправлено',
                  success: true,
                },
                dismissible: true,
                closeable: false,
                size: 's',
              }
            )
            .pipe(take(1))
            .subscribe()
        })
      )
    },
    {dispatch: false}
  )

  // failure$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(sendMessageWebhookFailureAction),
  //       concatMap(() => {
  //         return this.store.pipe(select(responseSelector)).pipe(
  //           switchMap((response: SupportFormResponseInterface) => {
  //             return this.supportService.deleteMessage(response.data.id)
  //           }),
  //           tap(() => {
  //             this.dialogService
  //               .open<any>(
  //                 new PolymorpheusComponent(AlertComponent, this.injector),
  //                 {
  //                   data: {
  //                     heading: 'Не удалось отправить сообщение',
  //                     failure: true,
  //                   },
  //                   dismissible: true,
  //                   closeable: false,
  //                   size: 's',
  //                 }
  //               )
  //               .pipe(take(1))
  //               .subscribe()
  //           })
  //         )
  //       })
  //     )
  //   },
  //   {dispatch: false}
  // )

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private actions$: Actions,
    private supportService: SupportService,
    private store: Store
  ) {}
}
