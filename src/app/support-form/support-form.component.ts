import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Router} from '@angular/router'
import {sendMessageAction} from './store/actions/send-message.action'
import {Observable} from 'rxjs'
import {Pattern} from '../shared/pattern/pattern'
import {phoneLengthValidator} from '../shared/validators/phone-length.validator'

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Заполните`,
        email: `Некорректный email`,
        minlength: (error) => {
          return `Минимум ${error.requiredLength} символа`
        },
        pattern: (error) => {
          return `Некорректные данные`
        },
        phoneLength: (error) => {
          return `Нeкорректный номер`
        },
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportFormComponent {
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<string>

  form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.Text),
        Validators.minLength(2),
      ],
    ],
    phone: ['', [Validators.required, phoneLengthValidator]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(Pattern.email),
      ],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.pattern(Pattern.TextWithNumbersAndSymbols),
        Validators.minLength(2),
      ],
    ],
    agree: [false, [Validators.required]],
    trace: [''],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
