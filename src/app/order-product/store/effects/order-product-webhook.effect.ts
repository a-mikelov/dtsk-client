import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ProductsService} from '../../../shared/services/products.service'
import {
  orderProductWebhookAction,
  orderProductWebhookFailureAction,
  orderProductWebhookSuccessAction,
} from '../actions/order-product-webhook.action'
import {catchError, map, of, switchMap, take, tap} from 'rxjs'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {Inject, Injectable, Injector} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'

@Injectable()
export class OrderProductWebhookEffect {
  sendWebhook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderProductWebhookAction),
      switchMap(({response}) => {
        return this.productsService
          .orderProductWebhook('Заказ товара', response)
          .pipe(
            map((response: OrderProductResponseInterface) => {
              return orderProductWebhookSuccessAction({response})
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                orderProductWebhookFailureAction({
                  backendErrors: errorResponse.error.error,
                })
              )
            })
          )
      })
    )
  })

  successWebhook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(orderProductWebhookSuccessAction),
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

  failureWebhook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(orderProductWebhookFailureAction),
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
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
