import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ProductsService} from '../../../shared/services/products.service'
import {
  orderProductWebhookAction,
  orderProductWebhookFailureAction,
  orderProductWebhookSuccessAction,
} from '../actions/order-product-webhook.action'
import {catchError, map, Observable, of, switchMap, take, tap} from 'rxjs'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {Inject, Injectable, Injector} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {select, Store} from '@ngrx/store'
import {ProductInterface} from '../../../products/types/product.interface'
import {responseSelector} from '../selectors'
import {
  orderProductFailureAction,
  orderProductSuccessAction,
} from '../actions/order-product.action'

@Injectable()
export class OrderProductWebhookEffect {
  product$: Observable<ProductInterface>

  sendWebhook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderProductSuccessAction),
      switchMap(({response}) => {
        return this.productsService
          .orderProductWebhook('Заказ продукта', response)
          .pipe(
            map(() => {
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

              return orderProductWebhookSuccessAction()
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.log('error webhook')

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

              return of(
                orderProductWebhookFailureAction({
                  backendErrors: errorResponse.error.error,
                })
              )
            })
          )
      })
    )
  )

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store
  ) {}
}
