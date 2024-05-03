import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IActionConfirm, IMessageHtml, IMessageText } from "@interfaces";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EmailService {
  constructor(
    public http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + 'email-service';
  }

  sentMessage(message: IMessageText) {
    console.log("sentMessage APi method", message);
    return this.http.post(`http://localhost:6000/api/email-service/sent-text-message`, message);
  }

  sentConfirmActionMessage(message: IMessageHtml): Observable<IActionConfirm> {
    return this.http.post<IActionConfirm>(`${this.url}/sent-confirm-message`, message);
  }
}
