import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tuiInputNumberOptionsProvider} from '@taiga-ui/kit';

@Component({
    selector: 'tags-tree',
    templateUrl: './tags-tree.component.html',
    styleUrl: './tags-tree.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [tuiInputNumberOptionsProvider({ step: 0.25})]
})
export class TagsTreeComponent {
    value = 1;
}
