import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ServicesService} from '../../../shared/services/services.service'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../actions/send-order.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'

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

  constructor(
    private actions$: Actions,
    private servicesService: ServicesService
  ) {}
}
