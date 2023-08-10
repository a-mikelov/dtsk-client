import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Router} from '@angular/router'
import {sendMessageAction} from './store/actions/send-message.action'
import {Observable, takeUntil, tap} from 'rxjs'
import {Pattern} from '../shared/pattern/pattern'
import {phoneLengthValidator} from '../shared/validators/phone-length.validator'
import {isSubmittingSelector, responseSelector} from './store/selectors'

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        email: `Email указан неверно`,
        minlength: (error) => {
          return `Минимум ${error.requiredLength} символа`
        },
        pattern: (error) => {
          return `Email указан неверно`
        },
        phoneLength: (error) => {
          return `Номер указан неверно`
        },
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportFormComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  response$: Observable<any>
  backendErrors$: Observable<string>

  form = this.fb.group({
    name: ['', [Validators.pattern(Pattern.Text), Validators.minLength(2)]],
    phone: ['', [phoneLengthValidator]],
    email: ['', [Validators.email, Validators.pattern(Pattern.email)]],
    message: [
      '',
      [
        Validators.pattern(Pattern.TextWithNumbersAndSymbols),
        Validators.minLength(2),
      ],
    ],
    // agree: [false, [Validators.required]],
    // trace: [''],
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector).pipe(
      tap((isSubmitting: boolean) => {
        if (isSubmitting) {
          this.form.disable()
        } else {
          this.form.enable()
        }
      })
    )

    this.store
      .select(responseSelector)
      .pipe(
        tap(() => {
          this.form.reset()
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const payload = this.form.value
    this.store.dispatch(sendMessageAction({payload}))
  }
}
