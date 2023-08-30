import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ServicesService} from '../../../shared/services/services.service'
import {
  orderServiceAction,
  orderServiceFailureAction,
  orderServiceSuccessAction,
} from '../actions/order-service.action'
import {catchError, map, of, switchMap, take, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Inject, Injectable, Injector} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {OrderServiceResponseInterface} from '../../types/order-service-response.interface'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'

@Injectable()
export class OrderServiceEffect {
  orderService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderServiceAction),
      switchMap(({payload}) => {
        return this.servicesService.orderService(payload).pipe(
          map((response: OrderServiceResponseInterface) => {
            return orderServiceSuccessAction({response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              orderServiceFailureAction({
                backendErrors: errorResponse.error.error,
              })
            )
          })
        )
      })
    )
  })

  success$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(orderServiceSuccessAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Ваш заказ получен!',
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
        ofType(orderServiceFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Ой, что-то не так...',
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
    private servicesService: ServicesService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}
}
