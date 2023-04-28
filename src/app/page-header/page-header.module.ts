import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PageHeaderComponent} from './page-header.component'
import {MainNavComponent} from './components/main-nav/main-nav.component'
import {MobileNavComponent} from './components/mobile-nav/mobile-nav.component'
import {TuiLinkModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [PageHeaderComponent, MainNavComponent, MobileNavComponent],
  imports: [CommonModule, TuiSvgModule, TuiLinkModule],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
