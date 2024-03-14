import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview.component";
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDialogModule,
  TuiSvgModule
} from "@taiga-ui/core";
import {
  TuiAppearanceModule,
  TuiBadgeModule,
  TuiButtonCloseModule,
  TuiIconModule,
  TuiNavigationModule
} from '@taiga-ui/experimental';
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiAccordionModule} from "@taiga-ui/kit";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {NgIf} from "@angular/common";



@NgModule({
  imports: [
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
