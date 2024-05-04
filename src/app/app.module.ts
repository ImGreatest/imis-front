import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiExpandModule,
    TuiHostedDropdownModule,
    TuiModeModule,
    TuiRootModule,
    TuiThemeNightModule
} from '@taiga-ui/core';
import {TuiBlockStatusModule} from "@taiga-ui/layout";
import {AppComponent} from './app.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {SidebarModule} from "./layout/sidebar/sidebar.module";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
    TuiAppearanceModule,
    TuiBadgeNotificationModule,
    TuiButtonCloseModule,
    TuiCardModule,
    TuiFadeModule,
    TuiHeaderModule,
    TuiIconModule,
    TuiIconsModule,
    TuiNavigationModule,
    TuiSurfaceModule,
    TuiTitleModule
} from "@taiga-ui/experimental";
import {TuiRepeatTimesModule} from "@taiga-ui/cdk";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiBarModule} from "@taiga-ui/addon-charts";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ComponentsModule} from "./component/components.module";
import {AuthInterceptor} from './auth/auth.interceptor';
import { TuiMobileDialogModule } from '@taiga-ui/addon-mobile';
import { TuiAvatarModule, TuiBadgeModule, TuiInputModule, TuiTabsModule } from '@taiga-ui/kit';

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
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
        TuiThemeNightModule,
        TuiRepeatTimesModule,
        TuiButtonCloseModule,
        TuiBarModule,
        SidebarModule,
        TuiModeModule,
        TuiBlockStatusModule,
        ComponentsModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        }, {
            provide: POLYMORPHEUS_CONTEXT,
            useValue: {}
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    exports: [AppComponent]
})
export class AppModule {}