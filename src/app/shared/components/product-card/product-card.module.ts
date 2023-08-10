import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ProductCardComponent} from './product-card.component'
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiSvgModule,
} from '@taiga-ui/core'
import {TuiCurrencyPipeModule, TuiMoneyModule} from '@taiga-ui/addon-commerce'

@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiMoneyModule,
  ],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
