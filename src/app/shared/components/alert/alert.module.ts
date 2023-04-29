import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AlertComponent} from './alert.component'
import {TuiButtonModule} from '@taiga-ui/core'

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, TuiButtonModule],
  exports: [AlertComponent],
})
export class AlertModule {}
