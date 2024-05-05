import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import {AppComponent} from './app.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {SidebarModule} from "./layout/sidebar/sidebar.module";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from "./component/components.module";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { AuthGuard } from "./auth/auth.guard";
import { CookieModule } from "ngx-cookie";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    TuiRootModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    ComponentsModule,
    CookieModule.withOptions(),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: POLYMORPHEUS_CONTEXT,
      useValue: {}
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  exports: [AppComponent],
})
export class AppModule {}
