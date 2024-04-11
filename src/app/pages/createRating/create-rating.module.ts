import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER, TuiRootModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RouterModule} from "@angular/router";
import {CreateRatingComponent} from "./create-rating.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiInputCountModule} from "@taiga-ui/kit";
import { TagsTreeModule } from "./tags-tree/tags-tree.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TagsTreeModule,
        TuiRootModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiInputCountModule,
        RouterModule.forChild([
            {
                path: '',
                component: CreateRatingComponent
            }
        ])
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }
    ],
    declarations: [CreateRatingComponent],
    exports: [CreateRatingComponent]
})
export class CreateRatingModule {}