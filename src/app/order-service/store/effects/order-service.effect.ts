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

  constructor(
    private actions$: Actions,
    private servicesService: ServicesService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}
}
