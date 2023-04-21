import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import {ServicesService} from "../shared/services/services.service";



@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeroComponent
  ],
  providers: [ServicesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroModule { }
