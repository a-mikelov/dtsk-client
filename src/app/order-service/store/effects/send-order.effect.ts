import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ServicesService} from '../../../shared/services/services.service'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../actions/send-order.action'
import {catchError, map, of, switchMap, take, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Inject, Injectable, Injector} from '@angular/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {TuiDialogService} from '@taiga-ui/core'

@Injectable()
export class SendOrderEffect {
  sendOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOrderAction),
      switchMap(({order}) => {
        return this.servicesService.sendOrder(order).pipe(
          map((response: any) => {
            return sendOrderSuccessAction({response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              sendOrderFailureAction({backendErrors: errorResponse.error.error})
            )
          })
        )
      })
    )
  })

  successOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendOrderSuccessAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Заказ сформирован',
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
      ),
    {dispatch: false}
  )

  failureOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendOrderFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Заказ не сформирован',
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
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private servicesService: ServicesService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}
}
