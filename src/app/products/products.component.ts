import {filter, map, Observable, tap} from "rxjs";
import Swiper, {SwiperOptions} from "swiper";
import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Store} from "@ngrx/store";
import {getProductsAction} from "./store/actions/get-products.action";
import {BackendErrorsInterface} from "../shared/types/backend-errors.interface";
import {GetProductsResponseInterface} from "./types/get-products-response.interface";
import {ProductInterface} from "./types/product.interface";
import {backendErrorsSelector, isLoadingSelector, productsSelector} from "./store/selectors";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  @ViewChild('swiperRef', { read: ElementRef, static: false })
  protected _swiperRef: ElementRef | undefined
  swiper?: Swiper

  isLoading$: Observable<boolean>
  products$: Observable<ProductInterface[]>
  backendErrors$: Observable<BackendErrorsInterface>

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.products$ = this.store.select(productsSelector)
      .pipe(
        filter(Boolean),
        map(({data}: GetProductsResponseInterface) => {
          return data
        }),
        tap(() => {
          this._initSwiper()
        }),
      )

    this.store.dispatch(getProductsAction())
  }

  private _initSwiper() {
    const options: SwiperOptions = {
      pagination: { clickable: true },
      slidesPerView: 1,
      breakpoints: {
        360: {
          slidesPerView: 1,
          spaceBetween: 50
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1160: {
          slidesPerView: 3,
          spaceBetween: 40
        },
      }
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
