import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core';
import {FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {TuiDestroyService} from "@taiga-ui/cdk";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ClientComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ClientComponent,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent {
  onTouched = () => {}

  form = this.fb.group({
    name: [null, [Validators.required]],
    company: null,
    email: [null, [Validators.required]],
    phone: [null, [Validators.required]],
  })

  get name() {
    return this.form.get('name') as FormControl
  }

  get company() {
    return this.form.get('company') as FormControl
  }

  get email() {
    return this.form.get('email') as FormControl
  }

  get phone() {
    return this.form.get('phone') as FormControl
  }

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService,
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
}
