import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUser } from './interface/user';
import { RatingService } from '../../common/services/api/rating.service';
import { IStudentScore } from '../../common/interfaces/rating/student.score';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  share,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { PageRes, PageResRating } from '../../common/interfaces/page';
import { tuiIsFalsy } from '@taiga-ui/cdk';
import { FormControl } from '@angular/forms';
import { IFilter } from '../../common/interfaces/rating/rating';

@Component({
  selector: 'ratingTable',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingTableComponent implements OnInit {
  constructor(private ratingService: RatingService) {}
  users: IUser[] = [];
  statusFilter: boolean = false;
  searchProjectControl = new FormControl('', {
    nonNullable: true,
  });
  readonly columns = [
    'place',
    'name',
    'surname',
    'group',
    'ratingScore',
    'actions',
  ];
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly sorter$ = new BehaviorSubject<string>('ratingScore');
  ngOnInit(): void {
    this.request$.subscribe((users) => {
      this.users = users;
    });
  }
  readonly size$ = new BehaviorSubject(10);
  readonly pageCount$ = new BehaviorSubject(0);
  readonly filters$ = new BehaviorSubject<IFilter[]>([]);
  pageCount = 0;
  minScore = 0;
  maxScore = 0;
  readonly ratingFilterControl = new FormControl([
    this.minScore,
    this.maxScore,
  ]);
  readonly courseFilterControl = new FormControl([0, 5]);
  readonly page$ = new BehaviorSubject(0);
  readonly request$ = combineLatest([
    this.sorter$,
    this.direction$,
    this.page$,
    this.size$,
    this.filters$,
  ]).pipe(
    debounceTime(0),
    switchMap(([key, direction, page, size, filters]) =>
      this.getData(key, direction, page, size, filters)
    ),
    share()
  );

  private getData(
    key: string,
    direction: -1 | 1,
    page: number,
    size: number,
    filters: IFilter[]
  ): Observable<any> {
    return this.ratingService
      .getScoreById(1, {
        column: key === 'place' ? 'ratingScore' : key,
        sortDirection: direction === 1 ? 'asc' : 'desc',
        page: page + 1,
        pageSize: size,
        filters: filters,
      })
      .pipe(
        map((data: PageResRating<IStudentScore>) => {
          this.pageCount$.next(data.info.totalPages);
          this.minScore = data.info.minScores;
          this.maxScore = data.info.maxScores;
          return data.rows.map((score: IStudentScore) => ({
            id: score.studentId,
            name: score.student.name,
            surname: score.student.surname,
            course: score.student.course,
            direction: score.student.direction.name,
            group: score.student.group.name,
            ratingScore: score.ratingScore,
          }));
        })
      );
  }
  readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

  remove(item: IUser): void {
    this.users = this.users.filter((user) => user !== item);
  }

  goToPage(index: number): void {
    this.page$.next(index);
  }
  openFilter() {
    this.statusFilter = true;
  }
  clearFilters() {
    this.ratingFilterControl.setValue([this.minScore, this.maxScore]);
    this.courseFilterControl.setValue([0, 5]);
    this.filters$.next([]);
  }
  confirmFilters() {
    const ratingScoreFilterValue = this.ratingFilterControl.value;
    const courseFilterFilterValue = this.courseFilterControl.value;
    console.log(ratingScoreFilterValue);
    console.log(courseFilterFilterValue);
  }
  closeFilter(active?: boolean): void {
    if (active === undefined || !active) {
      this.statusFilter = false;
    }
  }
}
