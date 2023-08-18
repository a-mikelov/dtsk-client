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

  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiUrl}/product-orders/${id}`)
  }

  orderProduct(payload): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/product-orders?populate=deep`,
      {data: payload}
    )
  }

  orderProductWebhook(
    formName: string,
    payload: OrderProductResponseInterface
  ) {
    const data = payload.data.attributes

    const params = new HttpParams({
      fromObject: {
        'fields[TITLE]': formName,
        'fields[NAME]': data.name,
        'fields[PHONE][0][VALUE_TYPE]': 'WORK',
        'fields[PHONE][0][VALUE]': data.client.phone,
        'fields[EMAIL][0][VALUE_TYPE]': 'WORK',
        'fields[EMAIL][0][VALUE]': data.client.email,
        'fields[SOURCE_ID]': 'UC_AILEWA',
        'fields[SOURCE_DESCRIPTION]': data.note,
        // 'fields[TRACE]': payload.trace,
      },
    })

    return this.http.get(
      `https://crm.dtsk.ru/rest/1/10hq9esm6cjopki7/crm.lead.add`,
      {params}
    )
  }
}
