import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SupportComponent} from './support.component'
import {MapModule} from '../shared/components/map/map.module'
import {SupportFormModule} from '../support-form/support-form.module'
import {SupportService} from '../support-form/services/support.service'

@NgModule({
  declarations: [SupportComponent],
  imports: [CommonModule, MapModule, SupportFormModule],
  exports: [SupportComponent],
  providers: [SupportService],
})
export class SupportModule {}
