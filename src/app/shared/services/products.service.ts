import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {OrderProductResponseInterface} from '../../order-product/types/order-product-response.interface'
import {Observable} from 'rxjs'

@Injectable()
export class ProductsService {
  private url = `${environment.apiUrl}/products`

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.url)
  }

  orderProduct(data): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/product-orders?populate=deep`,
      {data}
    )
  }
}
