import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ProductsService} from '../../../shared/services/products.service'
import {
  orderProductWebhookAction,
  orderProductWebhookFailureAction,
  orderProductWebhookSuccessAction,
} from '../actions/order-product-webhook.action'
import {
  catchError,
  concatMap,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {Inject, Injectable, Injector} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {select, Store} from '@ngrx/store'
import {ProductInterface} from '../../../products/types/product.interface'
import {
  orderProductFailureAction,
  orderProductSuccessAction,
} from '../actions/order-product.action'
import {productsSelector} from '../../../products/store/selectors'
import {responseSelector} from '../selectors'

@Injectable()
export class OrderProductWebhookEffect {
  response$: Observable<ProductInterface>

  sendWebhook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderProductSuccessAction),
      switchMap(({response}) => {
        return this.productsService
          .orderProductWebhook('Заказ продукта', response)
          .pipe(
            map(() => {
              return orderProductWebhookSuccessAction()
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
  )

  success$ = createEffect(
    () => {
      return this.actions$.pipe(
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
      )
    },
    {dispatch: false}
  )

  failure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(orderProductWebhookFailureAction),
        concatMap(() => {
          return this.store.pipe(select(responseSelector)).pipe(
            switchMap((response: OrderProductResponseInterface) => {
              return this.productsService.deleteProduct(response.data.id)
            }),
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
        })
      )
    },
    {dispatch: false}
  )

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store
  ) {}
}
