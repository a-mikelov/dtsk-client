import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swiper, {SwiperOptions} from "swiper";
import {ServicesService} from "../shared/services/services.service";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  @ViewChild('swiperRef', { static: true })
  protected _swiperRef: ElementRef | undefined
  swiper?: Swiper

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit() {
    this._initSwiper()
    this.servicesService.getServices()
      .subscribe((response) => {
        console.log('response', response)
      })
  }

  private _initSwiper() {
    const options: SwiperOptions = {
      pagination: { clickable: true },
      slidesPerView: 1,
      // breakpoints: this._getBreakpoints(), // In case you wish to calculate base on the `items` length
    }

    const swiperEl = this._swiperRef.nativeElement
    Object.assign(swiperEl, options)

    swiperEl.initialize()

    if (this.swiper) this.swiper.currentBreakpoint = false // Breakpoint fixes
    this.swiper = this._swiperRef.nativeElement.swiper

    this.swiper.off('slideChange') // Avoid multiple subscription, in case you wish to call the `_initSwiper()` multiple time

    this.swiper.on('slideChange', () => { // Any change subscription you wish
      // this.infinitLoad?.triggerOnScroll()
    })
  }
}
