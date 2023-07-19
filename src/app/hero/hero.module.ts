import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HeroComponent} from './hero.component'
import {ServicesService} from '../shared/services/services.service'
import {StoreModule} from '@ngrx/store'
import {HERO_FEATURE} from '../store/services/state'
import {EffectsModule} from '@ngrx/effects'
import {GetServicesEffect} from '../store/services/effects/get-services.effect'
import {reducers} from '../store/services/reducers'
import {TuiButtonModule, TuiLoaderModule, TuiSvgModule} from '@taiga-ui/core'
import {SwiperModule} from 'swiper/angular'
import {TuiLetModule} from '@taiga-ui/cdk'

@NgModule({
  declarations: [HeroComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(HERO_FEATURE, reducers),
    EffectsModule.forFeature([GetServicesEffect]),
    TuiLoaderModule,
    TuiButtonModule,
    TuiSvgModule,
    SwiperModule,
    TuiLetModule,
  ],
  exports: [HeroComponent],
  providers: [ServicesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroModule {}
