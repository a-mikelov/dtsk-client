import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {Observable} from 'rxjs'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {ServiceInterface} from '../shared/services/service.interface'
import {backendErrorsSelector, isSubmittingSelector} from './store/selectors'
import {sendOrderAction} from './store/actions/send-order.action'

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.scss'],
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
export class OrderServiceComponent {
  isSubmitting$: Observable<boolean>
  backendErrors: Observable<BackendErrorsInterface>

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
    // this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  get service(): ServiceInterface {
    return this.context.data.service
  }

  onClose() {
    this.context.completeWith(false)
  }

  submit(stepOne, stepTwo) {
    if (stepOne.invalid || stepTwo.invalid) {
      return
    }

    const order = {...stepOne, ...stepTwo}

    this.store.dispatch(
      sendOrderAction({
        order: {
          name: order.service,
          setDetails: order.showDetails,
          details: {
            date: order.details.date,
            min: order.details.minTime,
            max: order.details.maxTime,
            address: order.details.address,
          },
          user: {
            name: order.client.name,
            company: order.client.company,
            email: order.client.email,
            phone: order.client.phone,
          },
          note: order.note,
        },
      })
    )
  }

  setStep(number: number) {
    this.currentStep = number
  }
}