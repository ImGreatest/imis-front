import {CommonModule, NgIf} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiButtonModule, TuiTextfieldControllerModule, TUI_SANITIZER, TuiLabelModule, TuiLoaderModule} from "@taiga-ui/core";
import {TuiInputModule, TuiPaginationModule, TuiTagModule} from "@taiga-ui/kit";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {SuccessPageComponent} from "./success-page.component";
import {TuiIconModule} from "@taiga-ui/experimental";
import {TuiActiveZoneModule, TuiLetModule} from "@taiga-ui/cdk";
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TuiPaginationModule,
        TuiButtonModule,
        TuiTagModule,
        TuiTextfieldControllerModule,
        TuiTableModule,
        TuiInputModule,
        TuiActiveZoneModule,
        TuiIconModule,
        TuiLabelModule,
        TuiLoaderModule,
        NgIf,
        TuiLetModule,
        RouterModule.forChild([
            {
                path: '',
                component: SuccessPageComponent
            }
        ])
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }
    ],
    declarations: [SuccessPageComponent],
    exports: [SuccessPageComponent]
})
export class SuccessPageModule {}