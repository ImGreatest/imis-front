import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
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

@Component({selector: 'skills', templateUrl: './success-page.component.html', styleUrl: './success-page.component.less', changeDetection: ChangeDetectionStrategy.OnPush})
export class SuccessPageComponent implements OnInit {
    readonly search = new FormGroup({searchInput: new FormControl('')});

    constructor(private successService : SuccessService) {}

    ngOnInit(): void {
        this.request$.subscribe((success) => {
          this.success = success;
        });}

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
                case 'ratingScore':
                    orderProps = {
                        ratingScore: sortDirection
                    };
                    break;
                case 'group':
                    orderProps = {
                        user: {
                            group: {
                                name: sortDirection
                            }
                        }
                    };
                    break;
                case 'name':
                    orderProps = {
                        name: sortDirection
                    };
                    break;
                case 'description':
                    orderProps = {
                        description: sortDirection
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
}