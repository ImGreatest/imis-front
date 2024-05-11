import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
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
import { PageRes } from '@interfaces';
import {
  IPosibleConditions,
  IRole,
  IRolePermissionValue,
  IUpdatePermission,
} from '@interfaces';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogService,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  TuiPromptData,
  TUI_PROMPT,
  TuiInputModule,
  TuiPaginationModule,
  TuiMultiSelectModule,
  TuiDataListWrapperModule
} from '@taiga-ui/kit';
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiTableModule } from "@taiga-ui/addon-table";

@Component({
  selector: 'roles',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    ScrollingModule,
    TuiPaginationModule,
    TuiLoaderModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    FormsModule,
    TuiButtonModule,
    TuiLetModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiTableModule,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent implements OnInit {
  columns = ['Role'];
  roles: IRole[] = [];
  curUiPermissions: IRolePermissionValue = {};
  originUiPermissions: IRolePermissionValue = {};

  createRoleState: boolean = false;

  changeCreateRoleState() {
    this.createRoleState = !this.createRoleState;
    this.search.controls.createInput.setValue('');
  }

  readonly search = new FormGroup({
    searchInput: new FormControl(''),
    createInput: new FormControl(''),
  });

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
    } из ${this.actionsList[subject].length}`;
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
    this.curUiPermissions[role] = JSON.parse(
      JSON.stringify(this.originUiPermissions[role])
    );
  }
  savePermissions(role: string) {
    console.log(role, this.curUiPermissions[role]);
    const permissionsToUpdate: IUpdatePermission[] = [];

    Object.entries(this.curUiPermissions[role]).forEach(([key, value]) => {
      const entity = this.findKeyByValue(this.subjects, key);
      if (!entity) {
        console.error(`Entity not found for key: ${key}`);
        return; // Exit current iteration if entity is not found
      }

      value.forEach((perm) => {
        let condition = false;
        if (perm.includes('своего')) {
          condition = true;
          perm = perm.replace(' своего', '');
        }
        const action = this.findKeyByValue(this.actions, perm);
        if (!action) {
          console.error(`Action not found for permission: ${perm}`);
          return; // Exit current iteration if action is not found
        }
        const conditionRow = condition
          ? this.findConditionForEntity(entity)
          : false;
        const permissionResult: IUpdatePermission = {
          action: action,
          subject: entity,
        };
        if (conditionRow) {
          permissionResult.conditions = {
            id: `{{${conditionRow}}}`,
          };
        }
        permissionsToUpdate.push(permissionResult);
      });
    });

    this.roleService
      .createDeletePermissions(role, permissionsToUpdate)
      .subscribe(
        () => {
          this.alerts
            .open('', {
              label: 'Успешное обновление',
              status: 'success',
              autoClose: true,
            })
            .subscribe();
          this.page$.next(this.page$.value);
        },
        (error) => {
          this.alerts
            .open('', {
              label: 'Не удалось обновить',
              status: 'error',
              autoClose: true,
            })
            .subscribe();
        }
      );
  }

  findConditionForEntity(entity: string) {
    return this.posibleConditions.find((cond) => cond.entitys.includes(entity))
      ?.row;
  }

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef,
    @Inject(TuiAlertService) private alerts: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
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
      this.posibleConditions = val.posibleConditions;
      Object.keys(this.subjects).forEach((key) => {
        const ruKey = this.subjects[key];
        this.actionsList[ruKey] = Object.values(this.actions);
        if (
          this.posibleConditions
            .map((conditions) => conditions.entitys.includes(key))
            .includes(true)
        ) {
          this.actionsList[ruKey] = [
            ...this.actionsList[ruKey],
            ...this.actionsList[ruKey]
              .filter((action) => action != 'Создание')
              .map((action) => action + ' своего'),
          ];
        }
      });

      console.log(this.actionsList);
      this.cdr.markForCheck();
    });
    this.search.controls.searchInput.valueChanges.subscribe((value) => {
      this.filter$.next(value ?? '');
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
                (perm) =>
                  this.actions[perm.action] + (perm.conditions ? ' своего' : '')
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
  actionsList: { [key: string]: string[] } = {};
  private posibleConditions: IPosibleConditions[] = [];

  private _update() {
    this.page$.next(this.page$.value);
  }
  goToPage(index: number): void {
    this.page$.next(index);
  }
  findKeyByValue(obj: any, value: string) {
    return Object.keys(obj).find((key) => obj[key] === value);
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
  createRole() {
    const name = this.search.controls.createInput.value;
    if (!name) {
      this.alerts
        .open('', {
          label: 'Введите название новой роли',
          status: 'error',
          autoClose: true,
        })
        .subscribe();
      return;
    }
    this.roleService.create({ name: name }).subscribe(
      () => {
        this.alerts
          .open('', {
            label: 'Успешно создано',
            status: 'success',
            autoClose: true,
          })
          .subscribe();

        this._update();
        this.changeCreateRoleState()
      },
      (error) => {
        this.alerts
          .open('', {
            label: error.error.message || 'Не удалось создать',
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      }
    );
  }

  delete(id: number) {
    const data: TuiPromptData = {
      content: 'Вы уверены что хотите удалить роль?',
      yes: 'Да',
      no: 'Нет',
    };
    this.dialogs
      .open<boolean>(TUI_PROMPT, {
        label: 'Уверены?',
        size: 's',
        data,
      })
      .subscribe((result) => result && this._delete(id));
  }
  private _delete(id: number) {
    this.roleService.delete(id).subscribe(
      () => {
        this.alerts
          .open('', {
            label: 'Успешно удалено',
            status: 'success',
            autoClose: true,
          })
          .subscribe();

        this._update();
      },
      (error) => {
        this.alerts
          .open('', {
            label: error.error.message || 'Не удалось удалить',
            status: 'error',
            autoClose: true,
          })
          .subscribe();
      }
    );
  }
}
