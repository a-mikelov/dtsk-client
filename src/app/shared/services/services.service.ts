import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {Observable, shareReplay} from 'rxjs'
import {OrderProductResponseInterface} from '../../order-product/types/order-product-response.interface'
import {OrderServiceResponseInterface} from '../../order-service/types/order-service-response.interface'

@Injectable()
export class ServicesService {
  private url = `${environment.apiUrl}/services?populate=*`

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get(this.url).pipe(shareReplay(1))
  }

  orderService(payload): Observable<OrderProductResponseInterface> {
    return this.http.post<OrderProductResponseInterface>(
      `${environment.apiUrl}/service-orders?populate=deep`,
      {data: payload}
    )
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiUrl}/service-orders/${id}`)
  }

  orderServiceWebhook(
    formName: string,
    payload: OrderServiceResponseInterface
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
