import {Component, ChangeDetectionStrategy, OnInit, Inject, ChangeDetectorRef} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {ISuccessModalData, ISuccessStudent, ITag} from "@interfaces";
import {TagService, UserService} from "@services";
import {
    TUI_DEFAULT_MATCHER,
    TuiContextWithImplicit,
    TuiHandler,
    tuiIsNumber,
    tuiPure,
    TuiStringHandler
} from "@taiga-ui/cdk";
import {TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {
    map,
    Observable,
    of,
    startWith,
    Subject,
    switchMap
} from "rxjs";
import {SuccessService} from "src/app/common/services/api/success.service";

@Component({selector: 'create-update-success', templateUrl: './create-update-success.component.html', styleUrls: ['./create-update-success.component.less'], changeDetection: ChangeDetectionStrategy.OnPush})
export class CreateUpdateSuccessComponent implements OnInit {
    constructor(
      @Inject(POLYMORPHEUS_CONTEXT)private readonly context : TuiDialogContext < any, ISuccessModalData >,
      private userService : UserService,
      private tagService : TagService,
      private successService : SuccessService,private cdr : ChangeDetectorRef) {}
    readonly form = new FormGroup({nameControl: new FormControl(''), descriptionControl: new FormControl(''), tagsControl: new FormControl([]), studentControl: new FormControl(0)});

    ngOnInit() : void {
        // this.successId && this._fetchData(this.orderId);
        // this.userService.getStudentList().subscribe((data) => {this.students = data;})
        this.tagService.getList().subscribe((data) => {
            this.tags = data;
            console.log(this.tags);
            this.tagSearch$.next("");
            this.tagStringify$ = of(this.tags).pipe(map(items => new Map(items.map < [number, string] > (({id, name}) => [id, name]))), startWith(new Map()), map(map => (id : TuiContextWithImplicit < number > | number) =>
      (tuiIsNumber(id)
        ? map.get(id)
        : map.get(id.$implicit)) || 'Loading...',),);

        })
    }
    tags: ITag[] = [];
    private readonly tagSearch$ = new Subject < string > ();
    readonly tagItems$ : Observable < number[] | null > = this.tagSearch$
        .pipe(startWith(''), map((search) => {
            return this
                .tags
                .filter(({name}) => TUI_DEFAULT_MATCHER(name, search))
                .map(({id}) => id)
        }), startWith(null), //
        );



    readonly control = new FormControl([2]);

    onTagSearch(search : string | null) : void {
        this
            .tagSearch$
            .next(search || '');
    }
    students : ISuccessStudent[] = []
    tagStringify$ : Observable < TuiHandler < TuiContextWithImplicit < number > | number,
    string > > = of(this.tags).pipe(map(items => new Map(items.map < [number, string] > (({id, name}) => [id, name]))), startWith(new Map()), map(map => (id : TuiContextWithImplicit < number > | number) =>
      (tuiIsNumber(id)
        ? map.get(id)
        : map.get(id.$implicit)) || 'Loading...',),);
    @tuiPure
    stringify(items : readonly ISuccessStudent[],) : TuiStringHandler < TuiContextWithImplicit < number >> {
        const map = new Map(items.map((student) => [student.id, `${student.surname} ${student.name} ${student.direction} ${student.group}`]as[number,
            string]));

        return ({$implicit} : TuiContextWithImplicit < number >) => map.get($implicit) || '';
    }
    get successId() : number { return this.context.data.successId }
}
