import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class ServicesService {
  private url = `${environment.apiUrl}/services`

  constructor(private http: HttpClient) {
  }

  getServices() {
    return this.http.get(this.url)
  }
}
