import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, concatMap, map, of, switchMap, take, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../shared/components/alert/alert.component'
import {Inject, Injectable, Injector} from '@angular/core'
import {TuiDialogService} from '@taiga-ui/core'
import {select, Store} from '@ngrx/store'
import {responseSelector} from '../selectors'
import {orderServiceSuccessAction} from '../actions/order-service.action'
import {
  orderServiceWebhookFailureAction,
  orderServiceWebhookSuccessAction,
} from '../actions/order-service-webhook.action'
import {ServicesService} from '../../../shared/services/services.service'
import {OrderServiceResponseInterface} from '../../types/order-service-response.interface'
import {OrderProductResponseInterface} from '../../../order-product/types/order-product-response.interface'

@Injectable()
export class OrderServiceWebhookEffect {
  sendWebhook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderServiceSuccessAction),
      switchMap(({response}) => {
        return this.servicesService
          .orderServiceWebhook('Заказ услуги', response)
          .pipe(
            map(() => {
              return orderServiceWebhookSuccessAction()
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                orderServiceWebhookFailureAction({
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
        ofType(orderServiceWebhookSuccessAction),
        switchMap(() => {
          return this.store.pipe(select(responseSelector)).pipe(
            switchMap((response: OrderProductResponseInterface) => {
              return this.servicesService.updateService(response.data.id, {
                name: response.data.attributes.name,
                count: response.data.attributes.count,
                setDetails: response.data.attributes.setDetails,
                details: response.data.attributes.details,
                client: response.data.attributes.client,
                message: response.data.attributes.note,
              })
            })
          )
        }),
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
        ofType(orderServiceWebhookFailureAction),
        concatMap(() => {
          return this.store.pipe(select(responseSelector)).pipe(
            switchMap((response: OrderServiceResponseInterface) => {
              return this.servicesService.deleteProduct(response.data.id)
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
    private servicesService: ServicesService,
    private store: Store
  ) {}
}
