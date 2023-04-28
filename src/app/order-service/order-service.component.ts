import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {
  POLYMORPHEUS_CONTEXT,
} from '@tinkoff/ng-polymorpheus'
import {TuiDestroyService} from "@taiga-ui/cdk";
import {Observable} from "rxjs";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {BackendErrorsInterface} from "../shared/types/backend-errors.interface";
import {ServiceInterface} from "../shared/services/service.interface";

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderServiceComponent {
  isSubmitting$: Observable<boolean>
  backendErrors: Observable<BackendErrorsInterface>

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
    this.initForm()
  }

  get service(): ServiceInterface {
    return this.context.data.service
  }

  initForm() {
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  initValues(): void {
    // this.isSubmitting$ = this.store.select(isSubmittingSelector)

    //
  }

  onClose() {
    this.context.completeWith(false)
  }


  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const {identifier, password}: any = this.form.value

    // this.store.dispatch()
  }

  submit(stepOne, stepTwo) {
    console.log('stepOne', stepOne)
    console.log('stepTwo', stepTwo)
  }
}
