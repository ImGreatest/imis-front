import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TUI_SANITIZER, TuiButtonModule, TuiDataListModule, TuiLoaderModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiIslandModule,
    TuiMultiSelectModule,
    TuiSelectModule,
    TuiTreeModule
} from '@taiga-ui/kit';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiIconModule} from '@taiga-ui/experimental';
import {TuiLetModule} from '@taiga-ui/cdk';
import {CreateUpdateSuccessComponent} from './create-update-success.component';

@NgModule({
    imports: [
        CommonModule,
        TuiLoaderModule,
        TuiIslandModule,
        TuiMultiSelectModule,
        TuiLetModule,
        TuiInputModule,
        FormsModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
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
    declarations: [CreateUpdateSuccessComponent],
    exports: [CreateUpdateSuccessComponent]
})
export class CreateUpdateSuccessModule {}
