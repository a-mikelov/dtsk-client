import {ChangeDetectionStrategy, Component} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {TuiDestroyService} from '@taiga-ui/cdk'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  providers: [
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
export class StepTwoComponent {
  form: FormGroup = this.fb.group({
    client: '',
    note: '',
  })

  get client() {
    return this.form.get('client') as FormControl
  }

  get note() {
    return this.form.get('note') as FormControl
  }

  constructor(private fb: FormBuilder) {}
}
