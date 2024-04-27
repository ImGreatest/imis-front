import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    TuiAmountPipeModule,
    TuiAutoColorModule,
    TuiAvatarModule,
    TuiAvatarOutlineModule,
    TuiAvatarStackModule,
    TuiCardModule,
    TuiCellModule,
    TuiFallbackSrcModule,
    TuiHeaderModule,
    TuiInitialsModule,
    TuiSurfaceModule,
    TuiTitleModule
} from "@taiga-ui/experimental";
import {
    TUI_SANITIZER,
    TuiDataListModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  TuiDataListDropdownManagerModule,
  TuiDataListWrapperModule,
  TuiItemsWithMoreModule,
  TuiSelectModule,
  TuiTagModule
} from "@taiga-ui/kit";
import { TuiActiveZoneModule, TuiRepeatTimesModule } from "@taiga-ui/cdk";
import { ProjectCardComponent } from "./project-card.component";
import { RouterLink } from "@angular/router";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { FormsModule } from "@angular/forms";
import { TuiDropdownMobileModule } from "@taiga-ui/addon-mobile";

@NgModule({
    imports: [
        CommonModule,
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
        RouterLink,
        TuiFallbackSrcModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        FormsModule,
        TuiTextfieldControllerModule,
        TuiDropdownMobileModule,
        TuiAmountPipeModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }
    ],
    declarations: [ProjectCardComponent],
    exports: [ProjectCardComponent]
})
export class ProjectCardModule {}
