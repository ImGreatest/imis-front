import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { appConfig } from "./app/app.config";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./app/auth/auth.interceptor";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { StaticProvider } from "@angular/core";

const appProviders: StaticProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: TUI_SANITIZER,
    useClass: NgDompurifySanitizer
  },
];

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: 'APP_CONFIG',
        useValue: appConfig
      },
      ...appProviders,
    ]
  })
  .catch((err) => console.error(err));
