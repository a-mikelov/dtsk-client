import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core'
import {ProductInterface} from '../../../products/types/product.interface'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {OrderProductComponent} from '../../../order-product/order-product.component'
import {TuiDialogService} from '@taiga-ui/core'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product: any

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  order(product: ProductInterface) {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(OrderProductComponent, this.injector),
        {
          data: {
            product,
          },
          dismissible: true,
          closeable: false,
          size: 'm',
        }
      )
      .subscribe()
  }
}
