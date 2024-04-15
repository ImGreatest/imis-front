import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TUI_SANITIZER, TuiButtonModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputNumberModule, TuiTreeModule} from '@taiga-ui/kit';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {TagsTreeComponent} from './tags-tree.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiIconModule} from '@taiga-ui/experimental';
import {ExpandModule} from './expand-conponent';

@NgModule({
    imports: [
        CommonModule,
        TuiInputNumberModule,
        FormsModule,
        TuiTextfieldControllerModule,
        TuiTreeModule,
        TuiButtonModule,
        TuiIconModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }
    ],
    declarations: [
        TagsTreeComponent, ExpandModule
    ],
    exports: [TagsTreeComponent]
})
export class TagsTreeModule {}