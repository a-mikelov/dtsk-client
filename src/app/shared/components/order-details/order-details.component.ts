import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {TUI_VALIDATION_ERRORS, tuiCreateTimePeriods} from '@taiga-ui/kit'
import {
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {TuiDay, TuiDestroyService} from '@taiga-ui/cdk'
import {UtilsService} from '../../services/utils.service'
import {takeUntil} from 'rxjs'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OrderDetailsComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OrderDetailsComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Все поля обязательны для заполнения`,
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent {
  onTouched = () => {}

  minTimePeriod = tuiCreateTimePeriods()
  maxTimePeriod = tuiCreateTimePeriods(10, 20, [0, 15, 30, 45])

  form = this.fb.group({
    date: [null, [Validators.required]],
    minTime: [null, [Validators.required]],
    maxTime: [null, [Validators.required]],
    address: [null, [Validators.required]],
  })

  get date() {
    return this.form.get('date') as FormControl
  }

  get minTime() {
    return this.form.get('minTime') as FormControl
  }

  get maxTime() {
    return this.form.get('maxTime') as FormControl
  }

  get address() {
    return this.form.get('address') as FormControl
  }

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService,
    private utils: UtilsService
  ) {}

  requiredError(): ValidationErrors | null {
    const error = Object.entries(this.form.controls).some(([, control]) => {
      return control.errors && control.errors['required']
    })

    if (error) {
      this.form.setErrors({required: true})
      return {required: true}
    } else {
      return null
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value)
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  registerOnChange(onChange: any) {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(onChange)
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  validate(): ValidationErrors | null {
    return this.requiredError()
  }

  getMinDate() {
    const date = new Date()
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
  }
}
