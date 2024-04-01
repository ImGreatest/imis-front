import {NgModule} from "@angular/core";
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiHintModule, TuiLinkModule,
  TuiModeModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CommonModule} from "@angular/common";
import {OverviewComponent} from "./overview.component";
import {RouterModule} from "@angular/router";
import {TuiInputModule, TuiPaginationModule, TuiTagModule} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiAvatarModule, TuiAvatarStackModule, TuiFadeModule, TuiIconModule} from "@taiga-ui/experimental";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import { RatingTableModule } from "../../component/rating-table/rating.module";



@NgModule({
  imports: [
    RatingTableModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: OverviewComponent}
    ]),
    TuiInputModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiButtonModule,
    TuiIconModule,
    TuiModeModule,
    TuiScrollbarModule,
    TuiTagModule,
    TuiAvatarStackModule,
    TuiAvatarModule,
    TuiLinkModule,
    TuiFadeModule,
    TuiTableModule,
    TuiLetModule,
    TuiPaginationModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule {}
