import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";

@Injectable()
export class EmailService {
  constructor(
    public http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + 'user';
  }

  sentMail(to: string) {
    return this.http.get(`${this.url}/`)
  }
}
