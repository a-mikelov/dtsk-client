import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {
  getProductsAction,
  getProductsFailureAction,
  getProductsSuccessAction,
} from '../actions/get-products.action'
import {GetProductsResponseInterface} from '../../types/get-products-response.interface'
import {ProductsService} from '../../../shared/services/products.service'

@Injectable()
export class GetProductsEffect {
  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProductsAction),
      switchMap(() => {
        return this.productsService.getProducts().pipe(
          map((data: GetProductsResponseInterface) => {
            return getProductsSuccessAction({data})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getProductsFailureAction({
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
