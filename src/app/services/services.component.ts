import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core'
import {
  backendErrorsSelector,
  isLoadingSelector,
  servicesSelector,
} from '../store/services/selectors'
import {
  combineLatest,
  concatAll,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
} from 'rxjs'
import {GetServicesResponseInterface} from '../shared/services/get-services-response.interface'
import {ServiceInterface} from '../shared/services/service.interface'
import {getServicesAction} from '../store/services/actions/get-services.action'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {Store} from '@ngrx/store'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {OrderServiceComponent} from '../order-service/order-service.component'
import {TuiDialogService} from '@taiga-ui/core'
import {isPhoneScreenSelector} from '../store/global/selectors'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {
  isLoading$: Observable<boolean>
  services$: Observable<ServiceInterface[]>
  backendErrors$: Observable<BackendErrorsInterface>
  isPhone$: Observable<boolean>

  currentService: ServiceInterface

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    // this.isPhone$ = this.store.select(isPhoneScreenSelector)

    this.services$ = combineLatest([
      this.store.select(servicesSelector).pipe(
        filter(Boolean),
        map(({data}: GetServicesResponseInterface) => {
          return data
        }),
        switchMap((services: ServiceInterface[]) => {
          return of(services).pipe(
            concatAll(),
            filter((service: ServiceInterface) => {
              return !service.attributes.banner
            }),
            toArray()
          )
        }),
        map((offices: ServiceInterface[]) => {
          return offices.sort((a: ServiceInterface, b: ServiceInterface) => {
            return a.attributes.order - b.attributes.order
          })
        }),
        tap((services: ServiceInterface[]) => {
          this.currentService = services[0]
        })
      ),
      this.store.select(isPhoneScreenSelector),
    ]).pipe(
      map(([services, isMobile]) => {
        if (isMobile) {
          this.currentService = null
        } else {
          this.currentService = services[0]
        }

        return services
      })
    )

    this.store.dispatch(getServicesAction())
  }

  setContent(service: ServiceInterface) {
    this.currentService = service
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
