import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import Swiper, {Autoplay, SwiperOptions} from 'swiper'
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
import SwiperCore, {Navigation, Pagination} from 'swiper'

SwiperCore.use([Navigation, Pagination, Autoplay])

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements OnInit {
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
      })
    )

    this.store.dispatch(getServicesAction())
  }

  setImageUrl(src) {
    return environment.uploadUrl + src
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
          closeable: false,
          size: 'm',
        }
      )
      .subscribe()
  }
}
