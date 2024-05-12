import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiFadeIn,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
    BehaviorSubject,
    combineLatest,
    debounceTime,
    map,
    Observable,
    share,
    switchMap
} from 'rxjs';
import {IRatingTableElement, IFilter, PageRes, IRating} from '@interfaces';
import {RatingService} from '@services';
import {Router} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { TuiInputModule, TuiPaginationModule } from "@taiga-ui/kit";
import { TuiLetModule } from "@taiga-ui/cdk";
import { TuiTableModule } from "@taiga-ui/addon-table";

@Component({
  selector: 'math-models-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    TuiPaginationModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiTableModule,
  ],
  templateUrl: './math-models-table.component.html',
  styleUrl: './math-models-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn]
})
export class MathModelsTableComponent implements OnInit {
    constructor(private cdr : ChangeDetectorRef, private ratingService : RatingService, private router : Router, @Inject(TuiAlertService)private alerts : TuiAlertService) {}
    ratings : IRatingTableElement[] = [];
    readonly search = new FormGroup({searchInput: new FormControl('')});
    ngOnInit() : void {
        this
            .request$
            .subscribe((ratings) => {
                this.ratings = ratings;
                this
                    .cdr
                    .markForCheck()
            });
        this
            .search
            .controls
            .searchInput
            .valueChanges
            .subscribe((value) => {
                const filterValue = this
                    .filters$
                    .value
                    .filter((filter) => filter.column !== 'name');

                this
                    .filters$
                    .next([
                        ...filterValue, {
                            column: 'name',
                            value: {
                                contains: value
                            }
                        }
                    ]);
            });
        this
            .page$
            .next(0);
    }
    readonly columns = ['place', 'name', 'minuteUpdate', 'creater', 'actions'];
    readonly direction$ = new BehaviorSubject < -1 | 1 > (-1);
    readonly sorter$ = new BehaviorSubject < string > ('name');
    readonly size$ = new BehaviorSubject(10);
    readonly page$ = new BehaviorSubject(0);
    readonly pageCount$ = new BehaviorSubject(0);
    readonly filters$ = new BehaviorSubject < IFilter[] > ([]);
    goToPage(index : number) : void {
        this
            .page$
            .next(index);
    }

    readonly request$ = combineLatest([this.sorter$, this.direction$, this.page$, this.size$, this.filters$]).pipe(debounceTime(0), switchMap(([key, direction, page, size, filters]) => this.getData(key, direction, page, size, filters)), share());

    private getData(key : string | null, direction : -1 | 1, page : number, size : number, filters : IFilter[]) : Observable < any > {
        const sortDirection = direction === 1
            ? 'asc'
            : 'desc';
        let orderProps: any = {};

        if (key) {
            switch (key) {
                case 'creater':
                    orderProps = {
                        creater: {
                            name: sortDirection
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
            .ratingService
            .getPage({
                orderProps: orderProps,
                page: page + 1,
                pageSize: size,
                filters: filters
            })
            .pipe(map((data : PageRes < IRating >) => {
                this
                    .pageCount$
                    .next(data.info.totalPages);
                return data.rows;
            }));
    }

    goToMathModel(id : string) : void {
        // Navigate to the math-models/:id route
        this
            .router
            .navigate(['/math-models', id]);
    }

    delete(id : number) : void {
        this
            .ratingService
            .delete(id)
            .subscribe(() => {
                this
                    .alerts
                    .open('', {
                        label: 'Модель удалена',
                        status: 'success',
                        autoClose: true
                    })
                    .subscribe();

                this
                    .page$
                    .next(this.page$.value);
            }, (error) => {
                this
                    .alerts
                    .open('', {
                        label: 'Модель не удалена',
                        status: 'error',
                        autoClose: true
                    })
                    .subscribe();
            });
    }
}
