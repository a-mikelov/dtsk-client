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

  orderProduct(payload): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/product-orders?populate=deep`,
      {data: payload}
    )
  }

  orderProductWebhook(formName, payload) {
    console.log('payload', payload)
    const params = new HttpParams({
      fromObject: {
        'fields[TITLE]': formName,
        'fields[NAME]': payload.name,
        'fields[PHONE][0][VALUE_TYPE]': 'WORK',
        'fields[PHONE][0][VALUE]': payload.phone,
        'fields[EMAIL][0][VALUE_TYPE]': 'WORK',
        'fields[EMAIL][0][VALUE]': payload.email,
        'fields[SOURCE_ID]': 'UC_90HLMC',
        'fields[COMMENTS]': payload.message,
        'fields[TRACE]': payload.trace,
      },
    })

    return this.http.get(
      `https://bitrix.busbox.guru/rest/1/xk0350plspumy30m/crm.lead.add`,
      {params}
    )
  }
}
