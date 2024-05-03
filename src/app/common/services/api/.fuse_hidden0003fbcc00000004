import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IActionConfirm, IReqMessageHtml, IReqMessageText } from "@interfaces";
import { Observable, tap } from "rxjs";
import { IStateMessageConfirm } from "src/app/pages/authorisation/recover/interfaces/state-message-confirm.interface";

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(
    public http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + '/email-service';
  }

  sentMessage(message: IReqMessageText): Observable<IStateMessageConfirm> {
    console.log(message);
    return this.http.post<IStateMessageConfirm>(`${this.url}/sent-text-message`, message).pipe(tap(console.log));
  }

  confirmAction(message: IReqMessageHtml): void {
    console.log(message);
    this.http.post<void>(`${this.url}/sent-html-message`, message).pipe(tap(console.log)).subscribe();
  }
}
