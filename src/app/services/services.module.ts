import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ServicesComponent} from './services.component'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [ServicesComponent],
  exports: [ServicesComponent],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiLoaderModule,
    TuiLetModule,
  ],
})
export class ServicesModule {}
