import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { PageRes } from '../../interfaces/page';
import { Observable } from 'rxjs';
import { ICreateRating, IRating, IUpdateRating } from '../../interfaces/rating/rating';
import { IScope } from '../../interfaces/rating/scope';

@Injectable({ providedIn: 'root' })
export class RatingService {
    constructor(public http: HttpClient) {}
    getPage(page:number, limit:number): Observable<PageRes<IRating>> {
        return this.http.get<PageRes<IRating>>(`${environment.apiRatingUrl}/rating/page-${page}?limit=${limit}`);
    }
    createRating(rating:ICreateRating): Observable<IRating> {
        return this.http.post<IRating>(`${environment.apiRatingUrl}/rating`, rating);
    }
    getById(id:number): Observable<IRating> {
        return this.http.get<IRating>(`${environment.apiRatingUrl}/rating/${id}`);
    }
    updateRating(id:number, rating: IUpdateRating): Observable<IRating> {
        return this.http.put<IRating>(`${environment.apiRatingUrl}/rating/${id}`, rating);
    }
    delete(id:number): Observable<IRating> {
        return this.http.delete<IRating>(`${environment.apiRatingUrl}/rating/${id}`);
    }
    updateScope(id:number, data: IScope): Observable<null> {
        return this.http.put<null>(`${environment.apiRatingUrl}/rating/${id}/scope`,data);
    }


}
