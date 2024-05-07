import {CommonModule} from "@angular/common";
import {Injectable, NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import {TuiLoaderModule, TuiButtonModule, TuiTextfieldControllerModule, TUI_SANITIZER, TuiDataListModule} from "@taiga-ui/core";
import {
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiIslandModule,
    TuiPaginationModule,
    TuiSelectModule,
    TuiTreeModule
} from "@taiga-ui/kit";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {SkillsPageComponent} from "./skill.page.component";
import {TuiIconModule} from "@taiga-ui/experimental";
@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TuiInputModule,
        TuiPaginationModule,
        TuiIslandModule,
        TuiTreeModule,
        TuiLoaderModule,
        TuiButtonModule,
        TuiLetModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiTableModule,
        TuiIconModule,
        RouterModule.forChild([
            {
                path: '',
                component: SkillsPageComponent
            }
        ])
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }
    ],
    declarations: [SkillsPageComponent],
    exports: [SkillsPageComponent]
})
export class SkillsPageModule {}