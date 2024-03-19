import {NgModule} from "@angular/core";
import {
  TUI_SANITIZER,
} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CommonModule} from "@angular/common";
import {CompanyComponent} from "./company.component";
import {RouterModule} from "@angular/router";
import {ProjectsComponent} from "../projects/projects.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CompanyComponent}
    ]),
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
