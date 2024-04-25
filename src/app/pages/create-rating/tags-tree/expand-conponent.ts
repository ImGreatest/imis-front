import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiTreeItemContentComponent} from '@taiga-ui/kit';

@Component({selector: 'folders', template: `
        <button [icon]="this.isExpanded? 'tuiIconChevronDown' :'tuiIconChevronRight'" tuiButton tuiIconButton [size]="'s'" class="expand-button" *ngIf="this.isExpandable" (click)="onClick()"></button>    
        <div class="spacer" *ngIf="!this.isExpandable"></div>
        <ng-container [ngTemplateOutlet]="context.template"></ng-container>
    `, styleUrls: ['./expand-component.less']})
export class ExpandModule extends TuiTreeItemContentComponent {}