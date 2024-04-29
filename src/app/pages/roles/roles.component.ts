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
import { IPosibleConditions, IRole, IRolePermissionValue } from '@interfaces';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent implements OnInit {
  columns = ['Role'];
  roles: IRole[] = [];
  curUiPermissions: IRolePermissionValue = {};
  originUiPermissions: IRolePermissionValue = {};
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);
  readonly size$ = new BehaviorSubject<number>(10);
  readonly page$ = new BehaviorSubject<number>(0);
  readonly pageCount$ = new BehaviorSubject<number>(0);
  readonly filter$ = new BehaviorSubject<string>('');

  getContent(role: string, subject: string): string {
    return `Выбрано ${
      this.curUiPermissions[role][subject]
        ? this.curUiPermissions[role][subject].length
        : 0
    } из ${this.actionsList.length}`;
  }
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
  setOriginalPermissions(role: string) {
    this.curUiPermissions[role] = JSON.parse(JSON.stringify(this.originUiPermissions[role]));
  }
  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef
  ) {}
  checkChangedPermission(role: string): boolean {
    return Object.keys(this.originUiPermissions[role]).some((key) => {
      return !this.arraysAreEqual(
        this.originUiPermissions[role][key],
        this.curUiPermissions[role][key]
      );
    });
  }
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
      this.actions = val.actions;
      this.actionsList = Object.values(val.actions);
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
        data.rows.forEach((role) => {
          Object.keys(this.subjects).forEach((subject: any) => {
            if (!this.originUiPermissions[role.name]) {
              this.originUiPermissions[role.name] = {};
            }
            this.originUiPermissions[role.name][this.subjects[subject]] =
              role.Permission.filter((perm) => perm.subject === subject).map(
                (perm) => this.actions[perm.action]
              ) ?? [];
          });
        });
        this.curUiPermissions = JSON.parse(
          JSON.stringify(this.originUiPermissions)
        );
        this.cdr.markForCheck();
        return data.rows;
      })
    );
  }
  subjects: any;
  actions: any;
  actionsList: string[] = [];
  private posibleConditions: IPosibleConditions[] = [];

  goToPage(index: number): void {
    this.page$.next(index);
  }

  arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }
}
