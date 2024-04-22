import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tuiFadeIn } from '@taiga-ui/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  share,
  switchMap,
} from 'rxjs';
import { IRatingTableElement } from './interface/ratings.interface';
import { IFilter } from '../../common/interfaces/shared/filter.interface';
import { RatingService } from '../../common/services/api/rating.service';
import { PageRes, PageResRating } from '../../common/interfaces/page';
import { IStudentScore } from '../../common/interfaces/rating/student.score';
import { IRating } from '../../common/interfaces/rating/rating';

@Component({
  selector: 'app-events',
  templateUrl: './math-models-table.component.html',
  styleUrl: './math-models-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class MathModelsTableComponent implements OnInit {
  constructor(private ratingService: RatingService) {}
  ratings: IRatingTableElement[] = [];

  ngOnInit(): void {
    this.request$.subscribe((ratings) => {
      console.log(ratings);
      this.ratings = ratings;
    });
  }
  readonly columns = ['place', 'name', 'minuteUpdate', 'creater', 'actions'];
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly sorter$ = new BehaviorSubject<string>('name');
  readonly size$ = new BehaviorSubject(10);
  readonly page$ = new BehaviorSubject(0);
  readonly pageCount$ = new BehaviorSubject(0);
  readonly filters$ = new BehaviorSubject<IFilter[]>([]);

  readonly request$ = combineLatest([
    this.sorter$,
    this.direction$,
    this.page$,
    this.size$,
    this.filters$,
  ]).pipe(
    debounceTime(0.1),
    switchMap(([key, direction, page, size, filters]) =>
      this.getData(key, direction, page, size, filters)
    ),
    share()
  );

  private getData(
    key: string | null,
    direction: -1 | 1,
    page: number,
    size: number,
    filters: IFilter[]
  ): Observable<any> {
    const sortDirection = direction === 1 ? 'asc' : 'desc';
    let orderProps: any = {};

    if (key) {
      switch (key) {
        case 'creater':
          orderProps = { creater: { name: sortDirection } };
          break;
        default:
          orderProps = { [key]: sortDirection };
          break;
      }
    }
    return this.ratingService
      .getPage({
        orderProps: orderProps,
        page: page + 1,
        pageSize: size,
        filters: filters,
      })
      .pipe(
        map((data: PageRes<IRating>) => {
          this.pageCount$.next(data.info.totalPages);
          return data.rows;
        })
      );
  }
}
