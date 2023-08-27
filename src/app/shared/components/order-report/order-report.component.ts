import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReportComponent {
  @Input('data') dataProps
}
