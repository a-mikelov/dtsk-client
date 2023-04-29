import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'

@Injectable()
export class SupportService {
  constructor(private http: HttpClient) {}

  sendMessage(payload) {
    return this.http.post(`${environment.apiUrl}/feedbacks`, {data: payload})
  }
}
