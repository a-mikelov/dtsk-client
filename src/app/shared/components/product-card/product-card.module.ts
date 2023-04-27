import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiCurrencyPipeModule} from "@taiga-ui/addon-commerce";



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiCurrencyPipeModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
