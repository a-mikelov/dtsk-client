import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ContactsComponent} from './contacts.component'
import {TuiLinkModule, TuiSvgModule} from '@taiga-ui/core'

@NgModule({
  declarations: [ContactsComponent],
  imports: [CommonModule, TuiSvgModule, TuiLinkModule],
  exports: [ContactsComponent],
})
export class ContactsModule {}
