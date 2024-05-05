import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiSvgModule
} from "@taiga-ui/core";
import { OverviewComponent } from "./overview.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RatingTableModule } from "../../component/rating-table/rating.module";
import { NgModule } from "@angular/core";
import {
  TuiAutoColorModule,
  TuiAvatarModule, TuiAvatarOutlineModule, TuiAvatarStackModule,
  TuiCardModule, TuiCellModule,
  TuiHeaderModule, TuiInitialsModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TuiDataListDropdownManagerModule, TuiItemsWithMoreModule, TuiTagModule } from "@taiga-ui/kit";
import { TuiActiveZoneModule, TuiRepeatTimesModule } from "@taiga-ui/cdk";
import { ComponentsModule } from "../../component/components.module";

@NgModule({
  imports: [
    RatingTableModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: OverviewComponent }
    ]),
    TuiCardModule,
    TuiHeaderModule,
    TuiSurfaceModule,
    TuiHostedDropdownModule,
    TuiTitleModule,
    TuiItemsWithMoreModule,
    TuiTagModule,
    TuiAvatarModule,
    TuiAvatarOutlineModule,
    TuiDropdownModule,
    TuiSvgModule,
    TuiAvatarStackModule,
    TuiInitialsModule,
    TuiAutoColorModule,
    TuiDataListModule,
    TuiActiveZoneModule,
    TuiCellModule,
    TuiDataListDropdownManagerModule,
    TuiRepeatTimesModule,
    ComponentsModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule {}
