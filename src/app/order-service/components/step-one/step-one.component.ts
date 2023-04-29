import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {takeUntil, tap} from 'rxjs'
import {ServiceInterface} from '../../../shared/services/service.interface'

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit {
  @Input('service') serviceProps: ServiceInterface

  form: FormGroup = this.fb.group({
    service: '',
    setDetails: false,
    details: [{value: null, disabled: true}],
  })

  get service() {
    return this.form.get('service') as FormControl
  }

  get setDetails() {
    return this.form.get('setDetails') as FormControl
  }

  get details() {
    return this.form.get('details') as FormControl
  }

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.service.setValue(this.serviceProps.attributes.title)

    this.setDetails.valueChanges
      .pipe(
        tap((setDetails) => {
          if (setDetails) {
            this.details.enable()
          } else {
            this.details.disable()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }
}
