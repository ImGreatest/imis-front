import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiTreeItemContentComponent} from '@taiga-ui/kit';

@Component({
    selector: 'folders',
    template: `
        <button>+</button>    
        <ng-container [ngTemplateOutlet]="context.template"></ng-container>
    `,
    styleUrls: ['./expand-component.less'],
    host: {
        '(click)': 'onClick()'
    }
})
export class ExpandModule extends TuiTreeItemContentComponent {
    get icon() : string {
        return this.isExpandable
            ? 'tuiIconFolderLarge'
            : 'tuiIconFileLarge';
    }
}
