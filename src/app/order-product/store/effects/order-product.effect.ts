import {ProductsService} from '../../../shared/services/products.service'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap, take, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {
  orderProductAction,
  orderProductFailureAction,
  orderProductSuccessAction,
} from '../actions/order-product.action'
import {OrderProductResponseInterface} from '../../types/order-product-response.interface'

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

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
