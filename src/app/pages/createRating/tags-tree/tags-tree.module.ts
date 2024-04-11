import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {TuiInputNumberModule} from "@taiga-ui/kit";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TagsTreeComponent} from "./tags-tree.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule, TuiInputNumberModule, FormsModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }
    ],
    declarations: [TagsTreeComponent],
    exports: [TagsTreeComponent]
})
export class TagsTreeModule {}