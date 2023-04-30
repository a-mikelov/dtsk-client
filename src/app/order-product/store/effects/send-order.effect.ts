import {ProductsService} from '../../../shared/services/products.service'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Inject, Injectable, Injector} from '@angular/core'
import {catchError, map, of, switchMap, take, tap} from 'rxjs'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {TuiDialogService} from '@taiga-ui/core'
import {HttpErrorResponse} from '@angular/common/http'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../actions/send-product.action'

@Injectable()
export class SendOrderEffect {
  sendOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOrderAction),
      switchMap(({order}) => {
        return this.productsService.sendOrder(order).pipe(
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
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}
}
