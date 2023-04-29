import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent {
  @Input('data') dataProps
}
