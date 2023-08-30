import {ProductsService} from '../../../shared/services/products.service'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, take, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {
  orderProductAction,
  orderProductFailureAction,
  orderProductSuccessAction,
} from '../actions/order-product.action'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'
import {Inject, Injectable, Injector} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'

@Injectable()
export class OrderProductEffect {
  orderProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderProductAction),
      switchMap(({payload}) => {
        return this.productsService.orderProduct(payload).pipe(
          map((response: OrderProductResponseInterface) => {
            return orderProductSuccessAction({response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              orderProductFailureAction({
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
        ofType(orderProductSuccessAction),
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
        ofType(orderProductFailureAction),
        tap(() => {
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
        })
      )
    },
    {dispatch: false}
  )

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
