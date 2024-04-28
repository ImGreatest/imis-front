import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, share, switchMap } from 'rxjs/operators';

import {
  PageResRating,
  IUserInRating,
  IFilter,
  IStudentScore,
} from '@interfaces';
import { tuiIsFalsy } from '@taiga-ui/cdk';
import { FormControl, FormGroup } from '@angular/forms';
import { RatingService } from '@services';

@Component({
  selector: 'ratingTable',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingTableComponent implements OnInit {
  constructor(private ratingService: RatingService) {}
  users: IUserInRating[] = [];
  readonly search = new FormGroup({
    searchInput: new FormControl(''),
  });
  statusFilter: boolean = false;
  searchProjectControl = new FormControl('', { nonNullable: true });
  readonly columns = ['place', 'name', 'surname', 'group', 'ratingScore'];
  some(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
    this.request$.subscribe((users) => {
      this.users = users;
    });
    this.search.controls.searchInput.valueChanges.subscribe((value) => {
      this.filters$.next(
        this.filters$.value.filter((filter) => filter.column !== 'student')
      );
      this.filters$.next([
        ...this.filters$.value,
        {
          column: 'student',
          value: { surname: { contains: value, mode: 'insensitive' } },
        },
      ]);
    });
  }
  readonly size$ = new BehaviorSubject(10);
  readonly page$ = new BehaviorSubject(0);
  readonly pageCount$ = new BehaviorSubject(0);
  readonly filters$ = new BehaviorSubject<IFilter[]>([]);
  readonly sorter$ = new BehaviorSubject<string | null>('ratingScore');
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);

  pageCount = 0;
  minScore = 0;
  maxScore = 0;

  readonly minCourse = 1;
  readonly maxCourse = 5;

  readonly ratingFilterControl = new FormControl([
    this.minScore,
    this.maxScore,
  ]);

  readonly courseFilterControl = new FormControl([
    this.minCourse,
    this.maxCourse,
  ]);

  readonly directionSelect = new FormControl();
  readonly groupSelect = new FormControl();

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
        case 'ratingScore':
          orderProps = { ratingScore: sortDirection };
          break;
        case 'group':
          orderProps = { student: { group: { name: sortDirection } } };
          break;
        default:
          orderProps = { student: { [key]: sortDirection } };
          break;
      }
    }
    return this.ratingService
      .getScoreById(1, {
        orderProps: orderProps,
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

  goToPage(index: number): void {
    this.page$.next(index);
  }

  openFilter() {
    this.statusFilter = true;
  }

  clearFilters() {
    this.ratingFilterControl.setValue([this.minScore, this.maxScore]);
    this.courseFilterControl.setValue([1, 5]);
    this.filters$.next([]);
  }

  confirmFilters() {
    const ratingScoreFilterValue = this.ratingFilterControl.value;
    const courseFilterFilterValue = this.courseFilterControl.value;
    const filters: IFilter[] = [];
    if (
      ratingScoreFilterValue![0] !== this.minScore ||
      ratingScoreFilterValue![1] !== this.maxScore
    ) {
      filters.push({
        column: 'ratingScore',
        value: {
          gte: ratingScoreFilterValue![0],
          lte: ratingScoreFilterValue![1],
        },
      });
    }
    if (
      courseFilterFilterValue![0] !== this.minCourse ||
      courseFilterFilterValue![1] !== this.maxCourse
    ) {
      filters.push({
        column: 'student',
        value: {
          course: {
            gte: courseFilterFilterValue![0],
            lte: courseFilterFilterValue![1],
          },
        },
      });
    }
    this.filters$.next(filters);
  }

  closeFilter(active?: boolean): void {
    if (active === undefined || !active) {
      this.statusFilter = false;
    }
  }
}
