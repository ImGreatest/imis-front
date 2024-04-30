import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { Observable } from 'rxjs';
import { ITag, ITreeTag, ICreateTag } from '@interfaces';

@Injectable({ providedIn: 'root' })
export class TagService {
  constructor(public http: HttpClient) {}
  getList(): Observable<Array<ITag>> {
    return this.http.get<Array<ITag>>(
      `${environment.apiRatingUrl}/tag/getList`
    );
  }
  getAll(): Observable<Array<ITag>> {
    return this.http.get<Array<ITag>>(`${environment.apiRatingUrl}/tag/getAll`);
  }

  getTreeTags(ratingId: number): Observable<ITreeTag> {
    return this.http.get<ITreeTag>(
      `${environment.apiRatingUrl}/tag/tree/${ratingId}`
    );
  }
  createTag(tag: ICreateTag) {
    return this.http.post(`${environment.apiRatingUrl}/tag`, tag);
  }

  deleteTag(id: number) {
    return this.http.delete(`${environment.apiRatingUrl}/tag/${id}`);
  }
}
