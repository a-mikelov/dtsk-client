import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {backendErrorsSelector, isLoadingSelector, servicesSelector} from "../store/selectors";
import {concatAll, filter, map, Observable, of, switchMap, tap, toArray} from "rxjs";
import {GetServicesResponseInterface} from "../shared/services/get-services-response.interface";
import {ServiceInterface} from "../shared/services/service.interface";
import {getServicesAction} from "../store/actions/get-services.action";
import {BackendErrorsInterface} from "../shared/types/backend-errors.interface";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  isLoading$: Observable<boolean>
  services$: Observable<ServiceInterface[]>
  backendErrors$: Observable<BackendErrorsInterface>

  currentContentId: number = 0

  constructor(private store: Store) {}

  ngOnInit():void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.services$ = this.store.select(servicesSelector)
      .pipe(
        filter(Boolean),
        map(({data}: GetServicesResponseInterface) => {
          return data
        })
      )

    this.store.dispatch(getServicesAction())
  }

  setContent(id: number) {
    this.currentContentId = id
  }
}
