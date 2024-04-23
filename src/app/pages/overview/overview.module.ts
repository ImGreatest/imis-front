import {NgModule} from "@angular/core";
import {
  TUI_SANITIZER,
  TuiButtonModule, TuiDataListModule, TuiDropdownModule,
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
import {
  TuiBadgeModule,
  TuiInputModule,
  TuiItemsWithMoreModule,
  TuiPaginationModule,
  TuiTagModule
} from "@taiga-ui/kit";
import {ReactiveFormsModule} from "@angular/forms";
import {
  TuiAutoColorModule,
  TuiAvatarModule, TuiAvatarOutlineModule,
  TuiAvatarStackModule,
  TuiCardModule, TuiCellModule,
  TuiFadeModule, TuiHeaderModule,
  TuiIconModule, TuiInitialsModule, TuiSurfaceModule, TuiTitleModule
} from "@taiga-ui/experimental";
import {TuiTableModule} from "@taiga-ui/addon-table";
import { TuiLetModule, TuiRepeatTimesModule } from "@taiga-ui/cdk";
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
    TuiCardModule,
    TuiHeaderModule,
    TuiSurfaceModule,
    TuiTitleModule,
    TuiCellModule,
    TuiRepeatTimesModule,
    TuiBadgeModule,
    TuiItemsWithMoreModule,
    TuiInitialsModule,
    TuiAutoColorModule,
    TuiDropdownModule,
    TuiDataListModule,
    TuiAvatarOutlineModule,
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
