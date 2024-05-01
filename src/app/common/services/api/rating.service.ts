import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { PageRes, PageResRating } from '@interfaces';
import { Observable } from 'rxjs';
import {
  ICreateRating,
  IRating,
  IUpdateRating,
} from 'src/app/common/interfaces/rating/rating.interface';
import { IScope } from 'src/app/common/interfaces/rating/scope.interface';
import { IStudentScore } from 'src/app/common/interfaces/rating/student.score.interface';
import { IGetPage } from '../../interfaces/shared/req.page.interface';

@Injectable({ providedIn: 'root' })
export class RatingService {
  constructor(public http: HttpClient) {}
  getPage( data: IGetPage): Observable<PageRes<IRating>> {
    return this.http.post<PageRes<IRating>>(
      `${environment.apiRatingUrl}/rating/table`,data
    );
  }
  createRating(rating: ICreateRating): Observable<IRating> {
    return this.http.post<IRating>(
      `${environment.apiRatingUrl}/rating`,
      rating
    );
  }
  getById(id: number): Observable<IRating> {
    return this.http.get<IRating>(`${environment.apiRatingUrl}/rating/${id}`);
  }
  updateRating(id: number, rating: IUpdateRating): Observable<IRating> {
    return this.http.put<IRating>(
      `${environment.apiRatingUrl}/rating/${id}`,
      rating
    );
  }
  delete(id: number): Observable<IRating> {
    return this.http.delete<IRating>(
      `${environment.apiRatingUrl}/rating/${id}`
    );
  }
  updateScope(id: number, data: IScope): Observable<null> {
    return this.http.put<null>(
      `${environment.apiRatingUrl}/rating/${id}/scope`,
      data
    );
  }
  getScoreById(
    id: number,
    data: IGetPage
  ): Observable<PageResRating<IStudentScore>> {
    return this.http.put<PageResRating<IStudentScore>>(
      `${environment.apiRatingUrl}/rating/${id}/score`,
      data
    );
  }
  getDefaultScore(
    data: IGetPage
  ): Observable<PageResRating<IStudentScore>> {
    return this.http.put<PageResRating<IStudentScore>>(
      `${environment.apiRatingUrl}/rating/getScore/default`,
      data
    );
  }

  updateScoreById(id: number): Observable<null> {
    return this.http.get<null>(
      `${environment.apiRatingUrl}/rating/${id}/update`
    );
  }
}
