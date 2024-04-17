import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {TUI_TREE_CONTENT, tuiInputNumberOptionsProvider} from '@taiga-ui/kit';
import {ITreeTagElement, TagEvent, ITreeTagShowElement} from '../../../common/interfaces/tag/tag.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {TuiHandler} from '@taiga-ui/cdk';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {ExpandModule} from './expand-conponent';
@Component({
    selector: 'tags-tree',
    templateUrl: './tags-tree.component.html',
    styleUrls: ['./tags-tree.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiInputNumberOptionsProvider({step: 0.25}), {
            provide: TUI_TREE_CONTENT,
            useValue: new PolymorpheusComponent(ExpandModule)
        }
    ]
})
export class TagsTreeComponent implements OnInit {
    @Input()tagsValue : ITreeTagShowElement[] | undefined;
    @Output()onScoreChange = new EventEmitter < {
        id: number,
        score: number
    } > ();
    tags : ITreeTagShowElement[] = []
    expanded : boolean = true;
    name = 'some';
    childTags : ITreeTagElement[] = [];

    ngOnInit() : void {
        console.log(this.tagsValue)
    }
    onChange(id : number, event : any) {
        this
            .onScoreChange
            .next({id: id, score: event})
    }
    readonly handler : TuiHandler < ITreeTagShowElement,
    readonly ITreeTagShowElement[] > = item => item.childs || [];
}
