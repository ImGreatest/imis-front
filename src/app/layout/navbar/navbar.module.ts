import {NgModule} from "@angular/core";
import {NavbarComponent} from "./navbar.component";
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDialogModule,
  TuiSvgModule
} from "@taiga-ui/core";
import {
  TuiAppearanceModule, TuiAvatarModule,
  TuiBadgeModule,
  TuiButtonCloseModule, TuiFallbackSrcModule,
  TuiIconModule,
  TuiNavigationModule
} from '@taiga-ui/experimental';
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiAccordionModule, TuiBadgedContentModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {CommonModule, NgIf} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TuiBarModule} from "@taiga-ui/addon-charts";
import {ProjectsModule} from "../../pages/projects/projects.module";
import {RatingModule} from "../../pages/rating/rating.module";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: NavbarComponent}
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
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
