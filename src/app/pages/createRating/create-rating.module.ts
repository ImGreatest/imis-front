import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RouterModule} from "@angular/router";
import {CreateRatingComponent } from "./create-rating.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CreateRatingComponent}
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [CreateRatingComponent],
  exports: [CreateRatingComponent],
})
export class CreateRatingModule {}
