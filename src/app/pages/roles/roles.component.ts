import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RoleService } from '@services';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  share,
  switchMap,
} from 'rxjs';
import { PageRes } from '../../common/interfaces/shared/page';
import { IPosibleConditions, IRole } from '@interfaces';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent implements OnInit {
  columns = ['Role'];
  roles: IRole[] = [];
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly size$ = new BehaviorSubject<number>(4);
  readonly page$ = new BehaviorSubject<number>(0);
  readonly pageCount$ = new BehaviorSubject<number>(0);
  readonly filter$ = new BehaviorSubject<string>('');

  readonly request$ = combineLatest([
    this.direction$,
    this.page$,
    this.size$,
    this.filter$,
  ]).pipe(
    debounceTime(0),
    switchMap(([direction, page, size, filter]) =>
      this.getData(direction, page, size, filter)
    ),
    share()
  );

  constructor(
    private roleService: RoleService,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.request$.subscribe((roles) => {
      this.roles = roles;
    });
    this.roleService.getRoleAssert().subscribe((val) => {
      this.subjects = val.subjects;
      this.columns = [
        ...this.columns,
        ...Object.values(val.subjects),
        'actions',
      ];
      console.log(this.columns.slice(1, -1));
      this.actions = val.actions;
      this.posibleConditions = val.posibleConditions;
      this.cdr.markForCheck();
    });
  }

  private getData(
    direction: -1 | 1,
    page: number,
    size: number,
    filter: string
  ): Observable<any> {
    return this.roleService.getPage(size, page + 1, direction, filter).pipe(
      map((data: PageRes<IRole>) => {
        this.pageCount$.next(data.info.totalPages);
        this.cdr.markForCheck();

        return data.rows;
      })
    );
  }
  subjects: any;
  private actions: any;
  private posibleConditions: IPosibleConditions[] = [];

  goToPage(index: number): void {
    this.page$.next(index);
  }
}
