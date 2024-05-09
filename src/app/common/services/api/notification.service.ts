import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "@services";
import { Observable, tap } from "rxjs";
import { IReqCreateNoticeDto, IResNoticeDto, IReqUpdateNoticeDto } from "@interfaces";
import { ENotificationStatus } from "@enums";

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) {}

  get url(): string {
    return this.appService.apiUserUrl + '/notification';
  }

  createNotice(data: IReqCreateNoticeDto): Observable<IResNoticeDto> {
    return this.http.post<IResNoticeDto>(`${this.url}/create-notice`, data).pipe(tap(console.log));
  }

  getCurrent(id: number): Observable<IResNoticeDto> {
    return this.http.get<IResNoticeDto>(`${this.url}/get-current/${id}`);
  }

  getBySender(
    id: number,
    date?: string, // .toISOString.slice(0,10)
    visible?: boolean
  ): Observable<IResNoticeDto[]> {
    return this.http.get<IResNoticeDto[]>(`${this.url}/get-by-sender/:${id}?date=${date}&visible=${visible}`).pipe(
      tap(console.log)
    );
  }

  getByRecipient(
    id: number,
    date?: string, // .toISOString.slice(0,10)
    visible?: boolean
  ): Observable<IResNoticeDto[]> {
    return this.http.get<IResNoticeDto[]>(`${this.url}/get-by-recipient/:${id}?date=${date}&visible=${visible}`).pipe(
      tap(console.log)
    );
  }

  getByStatus(
    status: ENotificationStatus,
    date?: string, // .toISOString.slice(0,10)
    visible?: boolean
  ): Observable<IResNoticeDto[]> {
    return this.http.get<IResNoticeDto[]>(`${this.url}/get-by-status/:${status}?date=${date}&visible=${visible}`).pipe(
      tap(console.log)
    );
  }

  getByTime(
    date: string,
    visible?: boolean
  ): Observable<IResNoticeDto[]> {
    return this.http.get<IResNoticeDto[]>(`${this.url}/get-by-time/:${date}?visible=${visible}`).pipe(
      tap(console.log)
    );
  }

  getBySenderRecipient(
    sender: number,
    recipient: number,
    date?: string, // .toISOString.slice(0,10)
    visible?: boolean
  ): Observable<IResNoticeDto[]> {
    return this.http.get<IResNoticeDto[]>(
      `${this.url}/get-by-sender-and-recipient/${sender}?recipient=${recipient}&date=${date}&visible=${visible}`
    ).pipe(tap(console.log));
  }

  getByVisible(visible: boolean, date?: string): Observable<IResNoticeDto[]> {
    return this.http.get(`${this.url}/get-by-visible/:${visible}?date=${date}`).pipe(
      tap(console.log)
    );
  }

  changeStatus(id: number, status: ENotificationStatus): Observable<void> {
    return this.http.put<void>(`${this.url}/change-status/:${id}?status=${status}`, null).pipe(tap(console.log));
  }

  changeVisible(id: number, visible: boolean): Observable<void> {
    return this.http.put<void>(`${this.url}/change-visible/:${id}?visible=${visible}`, null).pipe(
      tap(console.log)
    );
  }

  updateNotice(id: number, data: IReqUpdateNoticeDto): Observable<void> {
    return this.http.put<void>(`${this.url}/update-notice/:${id}?data=${data}`, null).pipe(tap(
      console.log
    ));
  }

  deleteNotice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete-notice/:${id}`);
  }
}
