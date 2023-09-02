import {Inject, Injectable, Injector} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap, take, tap} from 'rxjs'
import {ResponseInterface} from '../../types/response.interface'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from '../actions/send-message.action'
import {TuiDialogService} from '@taiga-ui/core'
import {HttpErrorResponse} from '@angular/common/http'
import {SupportService} from '../../services/support.service'
import {SupportFormResponseInterface} from '../../types/support-form-response.interface'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'

@Injectable()
export class SendMessageEffect {
  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessageAction),
      delay(1000),
      switchMap(({payload}) =>
        this.supportService.sendMessage(payload).pipe(
          map((response: SupportFormResponseInterface) => {
            return sendMessageSuccessAction({response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              sendMessageFailureAction({
                backendErrors: errorResponse.error.error,
              })
            )
          })
        )
      )
    )
  )

  success$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendMessageSuccessAction),
        tap(() => {
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

  failure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendMessageFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Не удалось отправить сообщение',
                  failure: true,
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

  constructor(
    private actions$: Actions,
    private supportService: SupportService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}
}
