import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {SupportFormInterface} from '../types/support-form.interface'
import {SupportFormResponseInterface} from '../types/support-form-response.interface'
import {tap} from 'rxjs'

@Injectable()
export class SupportService {
  constructor(private http: HttpClient) {}

  sendMessage(payload: SupportFormInterface) {
    return this.http.post(`${environment.apiUrl}/feedbacks`, {
      data: {
        ...payload,
        publishedAt: null,
      },
    })
  }

  updateMessage(id: number, payload: any) {
    return this.http.put(`${environment.apiUrl}/feedbacks/${id}`, {
      data: {
        ...payload,
        publishedAt: new Date(),
      },
    })
  }

  deleteMessage(id: number) {
    return this.http.delete(`${environment.apiUrl}/feedbacks/${id}`)
  }

  sendMessageWebhook(formName: string, payload: SupportFormResponseInterface) {
    const data = payload.data.attributes

    const params = new HttpParams({
      fromObject: {
        'fields[TITLE]': formName,
        'fields[NAME]': data.name,
        'fields[PHONE][0][VALUE_TYPE]': 'WORK',
        'fields[PHONE][0][VALUE]': data.phone,
        'fields[EMAIL][0][VALUE_TYPE]': 'WORK',
        'fields[EMAIL][0][VALUE]': data.email,
        'fields[SOURCE_ID]': 'UC_AILEWA',
        'fields[SOURCE_DESCRIPTION]': data.message,
      },
    })

    return this.http.get(
      `https://crm.dtsk.ru/rest/1/10hq9esm6cjopki7/crm.lead.add`,
      {params}
    )
  }
}
