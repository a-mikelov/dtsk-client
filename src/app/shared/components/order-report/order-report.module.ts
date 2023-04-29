import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {OrderReportComponent} from './order-report.component'
import {TuiCurrencyPipeModule} from '@taiga-ui/addon-commerce'

@NgModule({
  declarations: [OrderReportComponent],
  imports: [CommonModule, TuiCurrencyPipeModule],
  exports: [OrderReportComponent],
})
export class OrderReportModule {}
