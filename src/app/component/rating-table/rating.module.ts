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
import { RatingTableComponent} from "./rating.component";
import {TuiInputModule, TuiPaginationModule, TuiTagModule} from "@taiga-ui/kit";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";



@NgModule({
    imports: [
        CommonModule,
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
  declarations: [RatingTableComponent],
  exports: [RatingTableComponent],
})
export class RatingTableModule {}
