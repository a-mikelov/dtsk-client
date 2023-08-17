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
import {
  backendErrorsSelector,
  isSubmittingSelector,
  responseSelector,
} from './store/selectors'
import {orderProductAction} from './store/actions/order-product.action'

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
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.store
      .select(responseSelector)
      .pipe(
        filter(Boolean),
        tap(() => this.close()),
        takeUntil(this.destroy$)
      )
      .subscribe()
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
    const {item, count, setDetails, client, note} = order

    const details = order.details
      ? {
          date: order.details.date,
          workTime: {
            minTime: order.details.minTime.toString(),
            maxTime: order.details.maxTime.toString(),
          },
          address: order.details.address,
        }
      : null

    this.store.dispatch(
      orderProductAction({
        payload: {
          name: item.name,
          count,
          setDetails,
          details,
          client,
          note,
        },
      })
    )
  }

  setStep(number: number) {
    this.currentStep = number
  }

  getReportData(stepOne, stepTwo) {
    return {...stepOne, ...stepTwo}
  }

  close() {
    this.context.completeWith(1)
  }
}
