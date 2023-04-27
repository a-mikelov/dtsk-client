import {Inject, Injectable, Injector} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, delay, map, of, switchMap} from "rxjs";
import {ResponseInterface} from "../../types/response.interface";
import {sendMessageAction, sendMessageFailureAction, sendMessageSuccessAction} from "../actions/send-message.action";
import {TuiDialogService} from "@taiga-ui/core";
import {HttpErrorResponse} from "@angular/common/http";
import {SupportService} from "../../services/support.service";

@Injectable()
export class SendMessageEffect {
  constructor(
    private actions$: Actions,
    private supportService: SupportService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessageAction),
      delay(1000),
      // switchMap(({payload}) =>
      //   this.supportService.sendMessage(payload).pipe(
      //     map((response: ResponseInterface) => {
      //       return sendMessageSuccessAction({response})
      //     }),
      //     catchError((errorResponse: HttpErrorResponse) => {
      //       return of(sendMessageFailureAction({backendErrors: errorResponse.error.error}))
      //     })
      //   )
      // )
    )
  )
}
