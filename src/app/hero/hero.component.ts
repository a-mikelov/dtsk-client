import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import Swiper, {SwiperOptions} from 'swiper'
import {ServicesService} from '../shared/services/services.service'
import {
  concatAll,
  delay,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
} from 'rxjs'
import {GetServicesResponseInterface} from '../shared/services/get-services-response.interface'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {Store} from '@ngrx/store'
import {
  backendErrorsSelector,
  isLoadingSelector,
  servicesSelector,
} from '../store/services/selectors'
import {getServicesAction} from '../store/services/actions/get-services.action'
import {ServiceInterface} from '../shared/services/service.interface'
import {environment} from '../../environments/environment'
import {OrderServiceComponent} from '../order-service/order-service.component'
import {TuiDialogService} from '@taiga-ui/core'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
  @ViewChild('swiperRef', {read: ElementRef, static: false})
  protected _swiperRef: ElementRef | undefined
  swiper?: Swiper

  isLoading$: Observable<boolean>
  services$: Observable<ServiceInterface[]>
  backendErrors$: Observable<BackendErrorsInterface>

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.services$ = this.store.select(servicesSelector).pipe(
      filter(Boolean),
      map(({data}: GetServicesResponseInterface) => {
        return data
      }),
      switchMap((services: ServiceInterface[]) => {
        return of(services).pipe(
          concatAll(),
          filter((service: ServiceInterface) => {
            return service.attributes.banner
          }),
          toArray()
        )
      }),
      tap((services) => {
        console.log('services', services)
        this._initSwiper()
      })
    )

    this.store.dispatch(getServicesAction())
  }

  private _initSwiper() {
    const options: SwiperOptions = {
      pagination: {clickable: true},
      slidesPerView: 1,
    }

    const swiperEl = this._swiperRef.nativeElement
    Object.assign(swiperEl, options)

    swiperEl.initialize()

    if (this.swiper) this.swiper.currentBreakpoint = false // Breakpoint fixes
    this.swiper = this._swiperRef.nativeElement.swiper

    this.swiper.off('slideChange') // Avoid multiple subscription, in case you wish to call the `_initSwiper()` multiple time

    this.swiper.on('slideChange', () => {
      // Any change subscription you wish
      // this.infinitLoad?.triggerOnScroll()
    })
  }

  setImageUrl(src) {
    return environment.apiUrlUpload + src
  }

  order(service: ServiceInterface) {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(OrderServiceComponent, this.injector),
        {
          data: {
            service,
          },
          dismissible: true,
          closeable: true,
          size: 'm',
        }
      )
      .subscribe()
  }
}
