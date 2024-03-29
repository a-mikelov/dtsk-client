import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable, shareReplay} from 'rxjs'
import {OrderProductResponseInterface} from '../../order-product/types/order-product-response.interface'
import {OrderServiceResponseInterface} from '../../order-service/types/order-service-response.interface'

@Injectable()
export class ServicesService {
  private url = `${environment.apiUrl}/services`

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get(`${this.url}?populate=deep`)
  }

  orderService(data): Observable<OrderProductResponseInterface> {
    return this.http.post<OrderProductResponseInterface>(
      `${environment.apiUrl}/service-orders?populate=deep`,
      {data}
    )
  }
}
