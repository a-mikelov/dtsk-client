import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from "@taiga-ui/core";

@NgModule({
  declarations: [
    ServicesComponent
  ],
  exports: [
    ServicesComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiLoaderModule
  ]
})
export class ServicesModule { }
