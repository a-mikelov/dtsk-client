import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PageHeaderComponent} from './page-header.component'
import {MainNavComponent} from './components/main-nav/main-nav.component'
import {MobileNavComponent} from './components/mobile-nav/mobile-nav.component'
import {TuiButtonModule, TuiLinkModule, TuiSvgModule} from '@taiga-ui/core'
import {RouterLink} from '@angular/router'

@NgModule({
  declarations: [PageHeaderComponent, MainNavComponent, MobileNavComponent],
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiLinkModule,
    TuiButtonModule,
    RouterLink,
  ],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
