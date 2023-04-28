import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'

@Injectable()
export class ServicesService {
  private url = `${environment.apiUrl}/services?populate=*`

  constructor(private http: HttpClient) {}

  getServices() {
    console.log('this.url', this.url)
    return this.http.get(this.url)
  }

  sendOrder(order) {
    return this.http.post(`${environment.apiUrl}/service-orders`, {data: order})
  }
}
