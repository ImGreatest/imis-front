import {NgModule} from "@angular/core";
import {SidebarComponent} from "./sidebar.component";
import {
  TUI_SANITIZER, TuiButtonModule,
  TuiDialogModule, TuiLinkModule, TuiModeModule, TuiScrollbarModule,
  TuiSvgModule
} from "@taiga-ui/core";
import {
  TuiAppearanceModule, TuiAvatarLabeledModule,
  TuiBadgeModule,
  TuiButtonCloseModule, TuiButtonVerticalModule, TuiFadeModule, TuiFallbackSrcModule,
  TuiIconModule,
  TuiNavigationModule
} from '@taiga-ui/experimental';
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {
  TuiAccordionModule,
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiMarkerIconModule,
  TuiToggleModule
} from "@taiga-ui/kit";
import {TuiActiveZoneModule, TuiForModule, TuiHoveredModule} from "@taiga-ui/cdk";
import {CommonModule, NgIf} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TuiBarModule} from "@taiga-ui/addon-charts";
import {NoticeComponent} from "./notice/notice.component";
import {BlockProfileComponent} from "./block-profile/block-profile.component";
import {BlockContentModule} from "./block-content/block-content.module";
import {BlockHeaderModule} from "./block-header/block-header.module";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SidebarComponent}
    ]),
    TuiIconModule,
    TuiSvgModule,
    TuiNavigationModule,
    TuiBadgeModule,
    TuiSidebarModule,
    TuiAccordionModule,
    TuiActiveZoneModule,
    TuiButtonModule,
    TuiButtonCloseModule,
    TuiDialogModule,
    NgIf,
    TuiAppearanceModule,
    TuiMarkerIconModule,
    TuiAvatarModule,
    TuiFallbackSrcModule,
    TuiBadgedContentModule,
    TuiBadgedContentModule,
    TuiBarModule,
    TuiModeModule,
    TuiScrollbarModule,
    TuiHoveredModule,
    TuiForModule,
    TuiFadeModule,
    TuiLinkModule,
    TuiAvatarModule,
    TuiAvatarLabeledModule,
    TuiButtonVerticalModule,
    TuiToggleModule,
    BlockHeaderModule,
    BlockContentModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [BlockProfileComponent, NoticeComponent, SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
