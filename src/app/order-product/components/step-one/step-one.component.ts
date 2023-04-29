import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  Self,
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {TuiDestroyService, TuiStringHandler} from '@taiga-ui/cdk'
import {takeUntil, tap} from 'rxjs'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {ProductInterface} from '../../../products/types/product.interface'

const STRINGIFY_PRODUCTS: TuiStringHandler<any> = (item: any) =>
  item ? `${item.name}` : ``

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
    tuiItemsHandlersProvider({stringify: STRINGIFY_PRODUCTS}),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent {
  @Input('product') productProps: ProductInterface

  products = []

  form: FormGroup = this.fb.group({
    item: '',
    count: '',
    setDetails: false,
    details: [{value: null, disabled: true}],
  })

  get item() {
    return this.form.get('item') as FormControl
  }

  get count() {
    return this.form.get('count') as FormControl
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
    if (Array.isArray(this.productProps.attributes)) {
      this.products = this.productProps.attributes
    } else {
      this.products = [this.productProps.attributes]
    }

    this.item.setValue(this.products[0])

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
