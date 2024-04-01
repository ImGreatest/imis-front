import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RatingComponent} from "./rating.component";
import {RouterModule} from "@angular/router";
import {TuiInputModule, TuiPaginationModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import { RatingTableModule } from "../../component/rating-table/rating.module";



@NgModule({
    imports: [
        RatingTableModule,
        CommonModule,
        RouterModule.forChild([
            {path: '', component: RatingComponent}
        ]),
        TuiLoaderModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiModeModule,
        TuiTableModule,
        TuiTagModule,
        TuiButtonModule,
        TuiLinkModule,
        TuiLetModule,
        TuiPaginationModule,
    ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [RatingComponent],
  exports: [RatingComponent],
})
export class RatingModule {}
