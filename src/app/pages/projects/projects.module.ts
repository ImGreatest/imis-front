import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";

import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {ProjectsComponent} from "./projects.component";

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
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
