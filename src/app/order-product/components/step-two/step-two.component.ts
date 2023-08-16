import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'
import {WindowInterface} from '../../../shared/types/window.interface'

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit {
  form: FormGroup = this.fb.group({
    client: '',
    note: '',
    trace: [''],
  })

  ngOnInit(): void {
    const _window: WindowInterface = window

    if (_window.b24Tracker) {
      this.form.get('trace').setValue(_window.b24Tracker.guest.getTrace())
    }
  }

  get client() {
    return this.form.get('client') as FormControl
  }

  get note() {
    return this.form.get('note') as FormControl
  }

  constructor(private fb: FormBuilder) {}
}
