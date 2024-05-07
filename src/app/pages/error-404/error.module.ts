import { NgModule } from "@angular/core";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { ErrorComponent } from "../error-404/error.component";

@NgModule({
  imports: [],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent],
})
export class ErrorModule {}
