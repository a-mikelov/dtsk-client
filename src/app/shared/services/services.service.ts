import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable, shareReplay} from 'rxjs'
import {OrderProductResponseInterface} from '../../order-product/types/order-product-response.interface'

@Injectable()
export class ServicesService {
  private url = `${environment.apiUrl}/services?populate=*`

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get(this.url).pipe(shareReplay(1))
  }

  sendOrder(order): Observable<OrderProductResponseInterface> {
    return this.http.post<OrderProductResponseInterface>(
      `${environment.apiUrl}/service-orders?populate=deep`,
      {data: order}
    )
  }
}
