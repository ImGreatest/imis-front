import {NgModule} from "@angular/core";
import {
  TUI_DIALOGS_CLOSE,
  TUI_SANITIZER,
  TuiButtonModule, TuiDataListModule, TuiDropdownModule,
  TuiHintModule, TuiHostedDropdownModule, TuiLinkModule,
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
  TuiComboBoxModule, TuiDataListDropdownManagerModule, TuiDataListWrapperModule, TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiItemsWithMoreModule,
  TuiPaginationModule, TuiStringifyContentPipeModule,
  TuiTagModule
} from "@taiga-ui/kit";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  TuiAutoColorModule,
  TuiAvatarModule, TuiAvatarOutlineModule,
  TuiAvatarStackModule, TuiBadgedContentModule, TuiBadgeModule,
  TuiCardModule, TuiCellModule,
  TuiFadeModule, TuiHeaderModule,
  TuiIconModule, TuiInitialsModule, TuiSurfaceModule, TuiTitleModule, TuiToggleModule
} from "@taiga-ui/experimental";
import {TuiTableModule} from "@taiga-ui/addon-table";
import { TuiActiveZoneModule, TuiLetModule, TuiRepeatTimesModule } from "@taiga-ui/cdk";
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
    TuiBadgedContentModule,
    TuiHostedDropdownModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiActiveZoneModule,
    TuiDataListDropdownManagerModule,
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
