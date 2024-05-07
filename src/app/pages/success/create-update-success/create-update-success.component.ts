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
import {TuiAlertService, TuiDialogContext} from "@taiga-ui/core";
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
      private tagService : TagService, @Inject(TuiAlertService) private alerts: TuiAlertService,
      private successService : SuccessService,private cdr : ChangeDetectorRef) {}
    readonly form = new FormGroup({nameControl: new FormControl(''), descriptionControl: new FormControl(''), tagsControl: new FormControl<number[]>([]), studentControl: new FormControl(0)});
    
    ngOnInit() : void {
        this.successId && this._fetchData(this.successId);
        this
            .userService
            .getStudentList()
            .subscribe((data) => {
                this.students = data;
            })
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
    private _fetchData(successId:number){
        this.successService.getSuccessById(successId).subscribe((data) => {
            const {nameControl, descriptionControl, tagsControl, studentControl} = this.form.controls;
            nameControl.setValue(data.name);
            descriptionControl.setValue(data.description);
            tagsControl.setValue(data.tags.map(tag => tag.tag.id));
            studentControl.setValue(data.user.id);
        })
    }
    tags: ITag[] = [
        
    ];
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
        const map = new Map(items.map((student) => [student.id, `${student.surname} ${student.name} ${student.direction.name} ${student.group.name}`]as[number,
            string]));

        return ({$implicit} : TuiContextWithImplicit < number >) => map.get($implicit) || '';
    }
    get successId() : number {return this.context.data.successId;}

    onSave(){
        const {nameControl, descriptionControl, tagsControl, studentControl} = this.form.controls;
        const name = nameControl.value;
        const description = descriptionControl.value;
        const tags = tagsControl.value;
        const student = studentControl.value;
        if (!name || !description || !tags || !student) 
            {
                this.alerts
                .open('', {
                  label: 'Заполните все поля',
                  status: 'error',
                  autoClose: true,
                })
                .subscribe();
                return
            };
            const successBody = {name:name, description:description, tags:tags, userId:student};
            const successObservable =
            this.successId
              ? this.successService.updateSuccess(this.successId,successBody)
              : this.successService.createSuccess( successBody);
        successObservable.subscribe( () => {
            this.alerts
              .open('', {
                label: 'Успешно сохранено',
                status: 'success',
                autoClose: true,
              })
              .subscribe();
            this.context.completeWith('created');
          },
          (error) => {
            this.alerts
              .open('', {
                label: error.error.message || 'Не удалось сохранить',
                status: 'error',
                autoClose: true,
              })
              .subscribe();
          });
    }

}
