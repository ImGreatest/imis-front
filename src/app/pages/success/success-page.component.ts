import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, Injector} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import {IFilter, ISuccess, ISuccessReq, PageRes} from "@interfaces";
import {tuiIsFalsy} from "@taiga-ui/cdk";
import {
    BehaviorSubject,
    combineLatest,
    debounceTime,
    map,
    Observable,
    share,
    switchMap
} from "rxjs";
import {SuccessService} from '../../common/services/api/success.service';
import {AppDialogService} from "src/app/component/dialog/app-dialog.service";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {CreateUpdateSuccessComponent} from "./create-update-success/create-update-success.component";

@Component({selector: 'skills', templateUrl: './success-page.component.html', styleUrl: './success-page.component.less', changeDetection: ChangeDetectionStrategy.OnPush})
export class SuccessPageComponent implements OnInit {
    readonly search = new FormGroup({searchStudentSurname: new FormControl(''), searchSuccessName: new FormControl('')});

    constructor(private cdr : ChangeDetectorRef, private successService : SuccessService, private appDialogService : AppDialogService, private injector : Injector) {}

    ngOnInit() : void {
        this
            .request$
            .subscribe((success) => {
                this.success = success;
                this
                    .cdr
                    .markForCheck()
            });
        this
            .search
            .controls
            .searchStudentSurname
            .valueChanges
            .subscribe((value) => {
                this
                    .filters$
                    .next(this.filters$.value.filter((filter) => filter.column !== 'user'));
                this
                    .filters$
                    .next([
                        ...this.filters$.value, {
                            column: 'user',
                            value: {
                                surname: {
                                    contains: value,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    ]);
            });
        this
            .search
            .controls
            .searchSuccessName
            .valueChanges
            .subscribe((value) => {
                console.log(value)
                this
                    .filters$
                    .next(this.filters$.value.filter((filter) => filter.column !== 'name'));
                this
                    .filters$
                    .next([
                        ...this.filters$.value, {
                            column: 'name',
                            value: {
                                contains: value,
                                mode: 'insensitive'
                            }
                        }
                    ]);
            });
    }

    readonly columns = [
        'place',
        'name',
        'description',
        'tags',
        "studentName",
        "studentSurname",
        "studentDirection",
        "studentGroup",
        "actions"
    ];
    success : ISuccess[] = []
    statusFilter = false;
    readonly size$ = new BehaviorSubject(10);
    readonly page$ = new BehaviorSubject(0);
    readonly pageCount$ = new BehaviorSubject(0);
    readonly filters$ = new BehaviorSubject < IFilter[] > ([]);
    readonly sorter$ = new BehaviorSubject < string | null > ('name');
    readonly direction$ = new BehaviorSubject < -1 | 1 > (-1);

    goToPage(index : any) : void {
        this
            .page$
            .next(index);
    }

    openFilter() {
        this.statusFilter = true;
    }

    clearFilters() {
        this
            .filters$
            .next([]);
    }

    confirmFilters() {
        const filters : IFilter[] = [];
        this
            .filters$
            .next(filters);
    }
    readonly request$ = combineLatest([this.sorter$, this.direction$, this.page$, this.size$, this.filters$]).pipe(debounceTime(0.1), switchMap(([key, direction, page, size, filters]) => this.getData(key, direction, page, size, filters)), share());
    private getData(key : string | null, direction : -1 | 1, page : number, size : number, filters : IFilter[]) : Observable < any > {
        const sortDirection = direction === 1
            ? 'asc'
            : 'desc';
        let orderProps: any = {};

        if (key) {
            switch (key) {
                case 'studentName':
                    orderProps = {
                        user: {
                            name: sortDirection
                        }
                    };
                    break;
                case 'studentSurname':
                    orderProps = {
                        user: {
                            surname: sortDirection
                        }
                    };
                    break;
                case 'studentGroup':
                    orderProps = {
                        user: {
                            group: {
                                name: sortDirection
                            }
                        }
                    };
                    break;
                case 'studentDirection':
                    orderProps = {
                        user: {
                            direction: {
                                name: sortDirection
                            }
                        }
                    };
                    break;
                default:
                    orderProps = {
                        [key]: sortDirection
                    };
                    break;
            }
        }
        return this
            .successService
            .getSuccessPage({
                orderProps: orderProps,
                page: page + 1,
                pageSize: size,
                filters: filters
            })
            .pipe(map((data : PageRes < ISuccessReq >) => {
                this
                    .pageCount$
                    .next(data.info.totalPages);
                return data
                    .rows
                    .map((success : ISuccessReq) => ({
                        id: success.id,
                        name: success.name,
                        description: success.description,
                        tags: success
                            .tags
                            .map((tag) => tag.tag),
                        studentName: success.user.name,
                        studentSurname: success.user.surname,
                        studentDirection: success.user.direction.name,
                        studentGroup: success.user.group.name
                    }));
            }));
    }
    readonly loading$ = this
        .request$
        .pipe(map(tuiIsFalsy));

    closeFilter(active?: any) : void {
        if(active === undefined || !active) {
            this.statusFilter = false;
        }
    }
    onCreateUpdateSuccess(id : number = -5) : void {
        this
            .appDialogService
            .open(new PolymorpheusComponent < any, any > (CreateUpdateSuccessComponent, this.injector), {
                size: 'm',
                closeable: true,
                title: id < 0
                    ? 'Создание успеха'
                    : 'Редактирование успеха',
                data: {
                    successId: id
                }
            })
            .subscribe((value : any) => value === 'created');
    }
}