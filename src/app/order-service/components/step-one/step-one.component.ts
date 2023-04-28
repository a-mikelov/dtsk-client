import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {TuiDestroyService} from "@taiga-ui/cdk";

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
  providers: [
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
export class StepOneComponent {
  form: FormGroup = this.fb.group({
    service: '',
    showDetails: false,
    details: ''
  });

  get service() {
    return this.form.get('service') as FormControl
  }

  get showDetails() {
    return this.form.get('showDetails') as FormControl
  }

  constructor(private fb: FormBuilder) {}
}
