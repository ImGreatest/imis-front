import {NgModule} from "@angular/core";
import {
  TUI_SANITIZER,
} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CommonModule} from "@angular/common";
import {CompanyComponent} from "./company.component";



@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [CompanyComponent],
  exports: [CompanyComponent],
})
export class CompanyModule {}
