import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ServicesService} from "../../../shared/services/services.service";
import {catchError, map, of, switchMap} from "rxjs";
import {getServicesAction, getServicesFailureAction, getServiceSuccessAction} from "../actions/get-services.action";
import {GetServicesResponseInterface} from "../../../shared/services/get-services-response.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class GetServicesEffect {
  getServices$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(getServicesAction),
        switchMap(() => {
          return this.servicesService.getServices()
            .pipe(
              map((data: GetServicesResponseInterface) => {
                return getServiceSuccessAction({data})
              }),
              catchError((errorResponse: HttpErrorResponse) => {
                return of(getServicesFailureAction({backendErrors: errorResponse.error.error}))
              })
            )
        })
      )
  })

  constructor(private actions$: Actions, private servicesService: ServicesService) {
  }
}
