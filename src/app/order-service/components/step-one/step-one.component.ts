import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {TuiDestroyService, TuiStringHandler} from '@taiga-ui/cdk'
import {takeUntil, tap} from 'rxjs'
import {
  ServiceInterface,
  ServicesAttributesInterface,
} from '../../../shared/services/service.interface'

const STRINGIFY_SERVICES: TuiStringHandler<ServicesAttributesInterface> = (
  item: ServicesAttributesInterface
) => (item ? `${item.name}` : ``)

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
    tuiItemsHandlersProvider({stringify: STRINGIFY_SERVICES}),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit {
  @Input('service') serviceProps: ServiceInterface

  services = []

  form: FormGroup = this.fb.group({
    item: '',
    setDetails: false,
    details: [{value: null, disabled: true}],
  })

  get item() {
    return this.form.get('item') as FormControl
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
    if (Array.isArray(this.serviceProps.attributes)) {
      this.services = this.serviceProps.attributes
    } else {
      this.services = [this.serviceProps.attributes]
    }

    this.item.setValue(this.services[0])

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
