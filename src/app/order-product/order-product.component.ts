import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {filter, Observable, takeUntil, tap} from 'rxjs'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {ProductInterface} from '../products/types/product.interface'

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        identifier: `Укажите корректный email`,
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderProductComponent {
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface>

  currentStep = 1
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private destroy$: TuiDestroyService,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('ok')
    // this.isSubmitting$ = this.store.select(isSubmittingSelector)
    // this.backendErrors$ = this.store.select(backendErrorsSelector)
    // this.store
    //   .select(dataSelector)
    //   .pipe(
    //     filter(Boolean),
    //     tap(() => this.close()),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe()
  }

  get product(): ProductInterface {
    return this.context.data.product
  }

  onClose() {
    this.context.completeWith(false)
  }

  submit(stepOne, stepTwo) {
    if (stepOne.invalid || stepTwo.invalid) {
      return
    }

    const order = {...stepOne, ...stepTwo}
    const {product, setDetails, client, note} = order

    console.log('order', order)

    const details = order.details
      ? {
          date: order.details.date,
          minTime: order.details.minTime,
          maxTime: order.details.maxTime,
          address: order.details.address,
        }
      : null

    // this.store.dispatch(
    //   sendOrderAction({
    //     order: {
    //       product,
    //       setDetails,
    //       details,
    //       client,
    //       note,
    //     },
    //   })
    // )
  }

  setStep(number: number) {
    this.currentStep = number
  }

  getReportData(product: ProductInterface, stepOne, stepTwo) {
    return {data: product, form: {...stepOne, ...stepTwo}}
  }

  close() {
    this.context.completeWith(1)
  }
}
