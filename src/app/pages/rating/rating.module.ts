import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RatingComponent} from "./rating.component";
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: RatingComponent}
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [RatingComponent],
  exports: [RatingComponent],
})
export class RatingModule {}
