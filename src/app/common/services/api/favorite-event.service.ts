import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { IReqSubscribeOnEventDto, IReqUnsubscribeOnEventDto } from "@interfaces";
import { Observable } from "rxjs";
import { IResGetSubsUserDto } from "@interfaces";

@Injectable({ providedIn: 'root' })
export class FavoriteEventService {
  constructor(
    public http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + '/user-favorite-event';
  }

  subscribeOnEvent(data: IReqSubscribeOnEventDto): Observable<void> {
    return this.http.post<void>(`${this.url}/subscribe-on-event`, data);
  }

  getSubsUser(id: number): Observable<IResGetSubsUserDto> {
    return this.http.get<IResGetSubsUserDto>(`${this.url}/get-subscribes-user/${id}`);
  }

  unsubscribeOnEvent(data: IReqUnsubscribeOnEventDto): Observable<void> {
    return this.http.delete<void>(`${this.url}/unsubscribe-on-event`);
  }
}
