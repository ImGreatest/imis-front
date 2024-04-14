import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { ITag } from '../../interfaces/tag';
import { ITreeTagElement } from '../../interfaces/tag/tag.interface';

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(public http: HttpClient) {}
  getList(): Observable<Array<ITag>> {
    return this.http.get<Array<ITag>>(
      `${environment.apiRatingUrl}/tag/getList`
    );
  }

  getTreeTags(ratingId: number): Observable<Array<ITreeTagElement>> {
    return this.http.get<Array<ITreeTagElement>>(
      `${environment.apiRatingUrl}/tag/tree/${ratingId}`
    );
  }
}
