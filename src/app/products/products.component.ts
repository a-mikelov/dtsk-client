import {filter, map, Observable, tap} from 'rxjs'
import Swiper, {SwiperOptions} from 'swiper'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {getProductsAction} from './store/actions/get-products.action'
import {BackendErrorsInterface} from '../shared/types/backend-errors.interface'
import {GetProductsResponseInterface} from './types/get-products-response.interface'
import {ProductInterface} from './types/product.interface'
import {
  backendErrorsSelector,
  isLoadingSelector,
  productsSelector,
} from './store/selectors'
import SwiperCore, {Navigation, Pagination} from 'swiper'

SwiperCore.use([Navigation, Pagination])

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  isLoading$: Observable<boolean>
  products$: Observable<ProductInterface[]>
  backendErrors$: Observable<BackendErrorsInterface>

  config: SwiperOptions = {
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      920: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // 1280: {
      //   slidesPerView: 4,
      //   spaceBetween: 30,
      // },
    },
    pagination: {clickable: true},
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.products$ = this.store.select(productsSelector).pipe(
      filter(Boolean),
      map(({data}: GetProductsResponseInterface) => {
        return data
      }),
      map((products: ProductInterface[]) => {
        return products.reduce((acc, current: ProductInterface) => {
          if (current.attributes.type === 'gasoline') {
            const group = acc.find((item) => {
              return item.type === 'gasoline'
            })

            if (group) {
              group.attributes.push(current.attributes)
            } else {
              acc.push({
                id: 1,
                type: 'gasoline',
                attributes: [current.attributes],
              })
            }
          } else {
            acc.push(current)
          }
          return acc
        }, [])
      })
    )

    this.store.dispatch(getProductsAction())
  }
}
