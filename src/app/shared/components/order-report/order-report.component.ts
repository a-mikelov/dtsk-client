import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReportComponent implements OnInit {
  @Input('data') dataProps

  ngOnInit(): void {
    console.log('dataProps', this.dataProps)
  }
}
