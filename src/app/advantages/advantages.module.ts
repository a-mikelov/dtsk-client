import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AdvantagesComponent} from './advantages.component'
import {TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [AdvantagesComponent],
  imports: [CommonModule, TuiSvgModule],
  exports: [AdvantagesComponent],
})
export class AdvantagesModule {}
