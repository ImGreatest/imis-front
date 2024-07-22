import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IFilter, ISubjectPermissions, ISuccess, ISuccessRes, PageRes } from '@interfaces';
import { tuiIsFalsy } from '@taiga-ui/cdk';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  share,
  switchMap,
} from 'rxjs';
import { SuccessService } from '../../common/services/api/success.service';
import { AppDialogService } from 'src/app/component/dialog/app-dialog.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CreateUpdateSuccessComponent } from './create-update-success/create-update-success.component';
import { AuthService } from '../../auth/auth.service';
import { PermissionService } from '../../auth/permission.service';

@Component({
  selector: 'skills',
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessPageComponent implements OnInit {
  readonly search = new FormGroup({
    searchStudentSurname: new FormControl(''),
    searchSuccessName: new FormControl(''),
  });

  perms: ISubjectPermissions = {
    delete: false,
    create: false,
    read: false,
    update: false,
    updateStatus: false,
    deleteCondition: false,
    createCondition: false,
    readCondition: false,
    updateCondition: false,
    updateStatusCondition: false,
    userId: -5
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private successService: SuccessService,
    private appDialogService: AppDialogService,
    private permissionService: PermissionService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.perms = this.permissionService.getPermissionsForSubject('success');
    this.request$.subscribe((success) => {
      this.success = success;
      this.cdr.markForCheck();
    });
    this.search.controls.searchStudentSurname.valueChanges.subscribe(
      (value) => {
        this.filters$.next(
          this.filters$.value.filter((filter) => filter.column !== 'user')
        );
        this.filters$.next([
          ...this.filters$.value,
          {
            column: 'student',
            value: {
              surname: {
                contains: value,
                mode: 'insensitive',
              },
            },
          },
        ]);
      }
    );
    this.search.controls.searchSuccessName.valueChanges.subscribe((value) => {
      console.log(value);
      this.filters$.next(
        this.filters$.value.filter((filter) => filter.column !== 'name')
      );
      this.filters$.next([
        ...this.filters$.value,
        {
          column: 'name',
          value: {
            contains: value,
            mode: 'insensitive',
          },
        },
      ]);
    });
  }

  readonly columns = [
    'place',
    'name',
    'description',
    'tags',
    'student',
    'studentDirection',
    'studentGroup',
    'creater',
    'actions',
  ];
  success: ISuccess[] = [];
  statusFilter = false;
  readonly size$ = new BehaviorSubject(10);
  readonly page$ = new BehaviorSubject(0);
  readonly pageCount$ = new BehaviorSubject(0);
  readonly filters$ = new BehaviorSubject<IFilter[]>([]);
  readonly sorter$ = new BehaviorSubject<string | null>('name');
  readonly direction$ = new BehaviorSubject<-1 | 1>(-1);

  goToPage(index: any): void {
    this.page$.next(index);
  }

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
    if(this.perms.readCondition){
        filters.push({column:'createrId',value:this.perms.userId})
    }
    if (key) {
      switch (key) {
        case 'studentGroup':
          orderProps = {
            student: {
              group: {
                name: sortDirection,
              },
            },
          };
          break;
        case 'studentDirection':
          orderProps = {
            student: {
              direction: {
                name: sortDirection,
              },
            },
          };
          break;
        case 'creater':
          orderProps = {
            creater: {
              surname: sortDirection,
            },
          };
          break;
        case 'student':
          orderProps = {
            student: {
              surname: sortDirection,
            },
          };
          break;
        default:
          orderProps = {
            [key]: sortDirection,
          };
          break;
      }
    }
    return this.successService
      .getSuccessPage({
        orderProps: orderProps,
        page: page + 1,
        pageSize: size,
        filters: filters,
      })
      .pipe(
        map((data: PageRes<ISuccessRes>) => {
          this.pageCount$.next(data.info.totalPages);
          return data.rows.map((success: ISuccessRes) => ({
            id: success.id,
            name: success.name,
            description: success.description,
            tags: success.tags.map((tag) => tag.tag),
            student: {
              name: success.student.name,
              surname: success.student.surname,
              direction: success.student.direction.name,
              group: success.student.group.name,
            },
            creater: {
              id: success.creater.id,
              name: success.creater.name,
              surname: success.creater.surname,
            },
          }));
        })
      );
  }
  readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

  onCreateUpdateSuccess(id: number = -5): void {
    const dataToModal =
      id < 0
        ? {}
        : {
            successId: id,
          };
    this.appDialogService
      .open(
        new PolymorpheusComponent<any, any>(
          CreateUpdateSuccessComponent,
          this.injector
        ),
        {
          size: 'm',
          closeable: true,
          title: id < 0 ? 'Создание успеха' : 'Редактирование успеха',
          data: dataToModal,
        }
      )
      .subscribe(
        (value: any) => value === 'created' && this.page$.next(this.page$.value)
      );
  }
}
