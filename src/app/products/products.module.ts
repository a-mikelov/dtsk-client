import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {StoreModule} from "@ngrx/store";
import {PRODUCTS_FEATURE} from "./store/state";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {GetProductsEffect} from "./store/effects/get-products.effect";
import {ProductsService} from "../shared/services/products.service";
import {TuiLoaderModule, TuiSvgModule} from "@taiga-ui/core";



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(PRODUCTS_FEATURE, reducers),
    EffectsModule.forFeature([GetProductsEffect]),
    TuiLoaderModule,
    TuiSvgModule
  ],
  exports: [
    ProductsComponent
  ],
  providers: [ProductsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule { }
