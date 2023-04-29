import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {TuiDialogService} from '@taiga-ui/core'
import {MobileNavComponent} from './components/mobile-nav/mobile-nav.component'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  showMobileNav() {
    this.dialogService
      .open<any>(new PolymorpheusComponent(MobileNavComponent, this.injector), {
        dismissible: true,
        closeable: false,
        size: 's',
      })
      .subscribe()
  }
}
