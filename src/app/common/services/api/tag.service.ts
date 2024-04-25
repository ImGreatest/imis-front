import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { ITag } from '../../interfaces/tag';
import { ITreeTag } from '../../interfaces/tag/tag.interface';

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(public http: HttpClient) {}
  getList(): Observable<Array<ITag>> {
    return this.http.get<Array<ITag>>(
      `${environment.apiRatingUrl}/tag/getList`
    );
  }

  getTreeTags(ratingId: number): Observable<ITreeTag> {
    return this.http.get<ITreeTag>(
      `${environment.apiRatingUrl}/tag/tree/${ratingId}`
    );
  }
}
