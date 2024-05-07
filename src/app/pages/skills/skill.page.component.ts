import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    OnInit,
    ChangeDetectorRef,
    Injectable
} from "@angular/core";
import {TUI_PROMPT, TUI_TREE_CONTENT, TuiPromptData} from "@taiga-ui/kit";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ExpandModule} from "../create-rating/tags-tree/expand-conponent";
import {TuiContextWithImplicit, TuiHandler, tuiPure, TuiStringHandler} from "@taiga-ui/cdk";
import {TuiAlertService, TuiDialogService} from "@taiga-ui/core";
import {SkillService} from "@services";
import {ISkillTypesWithSkills, ISkillUser} from "@interfaces";
import {FormGroup, FormControl} from "@angular/forms";

@Component({
    selector: 'skills',
    templateUrl: './skill.page.component.html',
    styleUrl: './skill.page.component.less',
    providers: [
        {
            provide: TUI_TREE_CONTENT,
            useValue: new PolymorpheusComponent(ExpandModule)
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsPageComponent implements OnInit {
    Skills : ISkillTypesWithSkills[] = []
    skillTypes : ISkillUser[] = []

    createSkillState = false;
    createSkillTypeState = false;

    readonly createForm = new FormGroup({skillInput: new FormControl(''), skillTypeSelect: new FormControl(0), skillTypeInput: new FormControl('')});
    @tuiPure
    stringify(items : ISkillUser[]) : TuiStringHandler < TuiContextWithImplicit < number >> {
        const map = new Map(items.map(({id, name}) => [id, name]as[number,
            string]));
        return ({$implicit} : TuiContextWithImplicit < number >) => map.get($implicit) || '';
    }
    constructor(private cdr : ChangeDetectorRef, private readonly skillService : SkillService, @Inject(TuiAlertService)private alerts : TuiAlertService, @Inject(TuiDialogService)private readonly dialogs : TuiDialogService) {}
    ngOnInit() : void {
        this._update();
    }
    private _update() {
        this
            .skillService
            .getSkills()
            .subscribe((skills) => {
                this.Skills = skills;
                this.skillTypes = skills.map(({id, name}) => ({id, name}));
                this
                    .cdr
                    .markForCheck()
            })
    }
    readonly handler : TuiHandler < ISkillTypesWithSkills,
    readonly ISkillTypesWithSkills[] > = (item) => item.skills || [];

    delete(id : number, type : string = "") {
        const data : TuiPromptData = {
            content: `Вы уверены что хотите удалить ${type} тег${type
                ? "а"
                : ''}?`,
            yes: 'Да',
            no: 'Нет'
        };
        this.dialogs.open < boolean > (TUI_PROMPT, {
            label: 'Уверены?',
            size: 's',
            data
        }).subscribe((result) => result && this._delete(id, type));
    }
    private _delete(id : number, type : string = "") {
        const skillObservable = type === ""
            ? this
                .skillService
                .deleteSkill(id)
            : this
                .skillService
                .deleteSkillType(id);

        skillObservable.subscribe(() => {
            this
                .alerts
                .open('', {
                    label: 'Успешно удалено',
                    status: 'success',
                    autoClose: true
                })
                .subscribe();
            this._update();
            

        }, (error) => {
            this
                .alerts
                .open('', {
                    label: error.error.message || 'Не удалось удалить',
                    status: 'error',
                    autoClose: true
                })
                .subscribe();
        });
    }
    changeCreateSkillState() {
        this.createSkillState = !this.createSkillState
    }
    createSkill() {
        const skillType = this.createForm.controls.skillTypeSelect.value ?? 0;
        const skillName = this.createForm.controls.skillInput.value ?? '';
        if (!skillType) {
            this
                .alerts
                .open('', {
                    label: 'Введите тип',
                    status: 'error',
                    autoClose: true
                })
                .subscribe();
            return;
        }
        if (!skillName) {
            this
                .alerts
                .open('', {
                    label: 'Введите название',
                    status: 'error',
                    autoClose: true
                })
                .subscribe();
            return;
        }
        this
            .skillService
            .createSkill({name: skillName, skillTypeId: skillType})
            .subscribe(() => {
                this
                    .alerts
                    .open('', {
                        label: 'Успешно создано',
                        status: 'success',
                        autoClose: true
                    })
                    .subscribe();
                this._update();
                this.createSkillState = !this.createSkillState;
                this
                    .createForm
                    .controls
                    .skillInput
                    .setValue("");
                    this
                    .createForm
                    .controls
                    .skillTypeSelect
                    .setValue(0);
                
            }, (error) => {
                this
                    .alerts
                    .open('', {
                        label: error.error.message || 'Не удалось создать',
                        status: 'error',
                        autoClose: true
                    })
                    .subscribe();
            });

    }
    changeCreateSkillTypeState() {
        this.createSkillTypeState = !this.createSkillTypeState
    }
    createSkillType() {
        const skillTypeName = this.createForm.controls.skillTypeInput.value ?? "";
        if (!skillTypeName) {
            this
                .alerts
                .open('', {
                    label: 'Введите название',
                    status: 'error',
                    autoClose: true
                })
                .subscribe();
            return;
        }
        this
            .skillService
            .createSkillType(skillTypeName)
            .subscribe(() => {
                this
                    .alerts
                    .open('', {
                        label: 'Успешно создано',
                        status: 'success',
                        autoClose: true
                    })
                    .subscribe();
                this._update();
                this.createSkillTypeState = !this.createSkillTypeState;
                this
                    .createForm
                    .controls
                    .skillTypeInput
                    .setValue("");
            }, (error) => {
                this
                    .alerts
                    .open('', {
                        label: error.error.message || 'Не удалось создать',
                        status: 'error',
                        autoClose: true
                    })
                    .subscribe();
            });

    }
}