import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { Observable } from "rxjs";
import { IReqCreateEventDto, IReqUpdateEventDto } from "@interfaces";
import { IResEvent } from "@interfaces";

@Injectable()
export class EventService {
  constructor(
    public http: HttpClient,
    private appService: AppService
  ) {}

  get url() {
    return this.appService.apiUserUrl + '/event';
  }

  createEvent(data: IReqCreateEventDto): Observable<void> {
    return this.http.post<void>(`${this.url}/create-event`, data);
  }

  getEvent(eventId: number): Observable<IResEvent> {
    return this.http.get<IResEvent>(`${this.url}/get-event/${eventId}`);
  }

  getEvents(): Observable<IResEvent[]> {
    return this.http.get<IResEvent[]>(`${this.url}/get-events`);
  }

  updateEvent(id: number, data: IReqUpdateEventDto): Observable<void> {
    return this.http.put<void>(`${this.url}/update-event/${id}`, data);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete-event/${id}`);
  }
}
