import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER, TuiModeModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RatingComponent} from "./rating.component";
import {RouterModule} from "@angular/router";
import {TuiInputModule} from "@taiga-ui/kit";
import {TuiTableModule} from "@taiga-ui/addon-table";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: RatingComponent}
    ]),
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiModeModule,
    TuiTableModule,
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
