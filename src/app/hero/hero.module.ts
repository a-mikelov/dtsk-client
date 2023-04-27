import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import {ServicesService} from "../shared/services/services.service";
import {StoreModule} from "@ngrx/store";
import {HERO_FEATURE} from "./store/state";
import {EffectsModule} from "@ngrx/effects";
import {GetServicesEffect} from "./store/effects/get-services.effect";
import {reducers} from "./store/reducers";

@NgModule({
  declarations: [
    HeroComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(HERO_FEATURE, reducers),
    EffectsModule.forFeature([GetServicesEffect])
  ],
  exports: [
    HeroComponent
  ],
  providers: [ServicesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroModule { }
