import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {shareReplay} from 'rxjs'

@Injectable()
export class ServicesService {
  private url = `${environment.apiUrl}/services?populate=*`

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get(this.url).pipe(shareReplay(1))
  }

  sendOrder(order) {
    return this.http.post(`${environment.apiUrl}/service-orders`, {data: order})
  }
}
