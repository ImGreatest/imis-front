import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  TUI_SANITIZER,
  TuiAlertModule, TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule, TuiExpandModule,
  TuiHostedDropdownModule,
  TuiRootModule
} from '@taiga-ui/core';
import {AppComponent} from './app.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {TuiAvatarModule, TuiBadgeModule, TuiInputModule, TuiTabsModule} from "@taiga-ui/kit";
import {TuiMobileDialogModule} from "@taiga-ui/addon-mobile";
import {OverviewModule} from "./overview/overview.module";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
  TuiAppearanceModule,
  TuiBadgeNotificationModule, TuiButtonCloseModule, TuiCardModule, TuiFadeModule, TuiHeaderModule,
  TuiIconModule, TuiIconsModule,
  TuiNavigationModule, TuiSurfaceModule, TuiTitleModule
} from "@taiga-ui/experimental";
import {TuiRepeatTimesModule} from "@taiga-ui/cdk";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiMobileDialogModule,
    TuiInputModule,
    AppRoutingModule,
    RouterOutlet,
    TuiIconModule,
    TuiDataListModule,
    TuiAppearanceModule,
    TuiHostedDropdownModule,
    TuiNavigationModule,
    TuiAvatarModule,
    TuiBadgeNotificationModule,
    TuiButtonModule,
    TuiFadeModule,
    TuiBadgeModule,
    TuiIconsModule,
    RouterLink,
    RouterLinkActive,
    TuiExpandModule,
    TuiTabsModule,
    TuiCardModule,
    TuiHeaderModule,
    TuiSurfaceModule,
    TuiTitleModule,
    TuiRepeatTimesModule,
    TuiButtonCloseModule,
    OverviewModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: POLYMORPHEUS_CONTEXT,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
