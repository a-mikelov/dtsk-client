import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SupportService {
  constructor(private http: HttpClient) {
  }

  sendMessage(payload) {
    console.log('send message')
  }
}
