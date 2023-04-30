import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PageFooterComponent} from './page-footer.component'
import {TuiLinkModule} from '@taiga-ui/core'

@NgModule({
  declarations: [PageFooterComponent],
  imports: [CommonModule, TuiLinkModule],
  exports: [PageFooterComponent],
})
export class PageFooterModule {}
