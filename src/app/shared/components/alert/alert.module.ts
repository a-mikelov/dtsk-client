import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AlertComponent} from './alert.component'
import {TuiButtonModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, TuiButtonModule, TuiSvgModule],
  exports: [AlertComponent],
})
export class AlertModule {}
