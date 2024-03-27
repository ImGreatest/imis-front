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
import { PageRes } from '../../common/interfaces/page';
import { tuiIsFalsy } from '@taiga-ui/cdk';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent implements OnInit {
  constructor(private ratingService: RatingService) {}
  users: IUser[] = [];
  readonly columns = [
    'Place',
    'Name',
    'Surname',
    'Course',
    'ratingScore',
    'actions',
  ];
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly sorter$ = new BehaviorSubject<string>('ratingScore');
  ngOnInit(): void {
    this.request$.subscribe((users) => (this.users = users));
  }
  readonly size$ = new BehaviorSubject(10);
  readonly pageCount$ = new BehaviorSubject(0);
  pageCount = 0;
  readonly page$ = new BehaviorSubject(0);
  readonly request$ = combineLatest([
    this.sorter$,
    this.direction$,
    this.page$,
    this.size$,
  ]).pipe(
    debounceTime(0),
    switchMap(([key, direction, page, size]) =>
      this.getData(key, direction, page, size)
    ),
    share()
  );
  private getData(
    key: string,
    direction: -1 | 1,
    page: number,
    size: number
  ): Observable<any> {
    return this.ratingService
      .getScoreById(1, {
        column: key,
        sortDirection: direction === 1 ? 'asc' : 'desc',
        page: page + 1,
        pageSize: size,
      })
      .pipe(
        map((data: PageRes<IStudentScore>) => {
          this.pageCount$.next(data.info.totalPages);
          return data.rows.map((score: IStudentScore) => ({
            id: score.studentId,
            name: score.student.name,
            surname: score.student.surname,
            course: score.student.course,
            direction: score.student.direction,
            group: score.student.group,
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
}
