import {NgModule} from "@angular/core";
import {OverviewComponent} from "./overview.component";
import {TUI_SANITIZER, TuiSvgModule} from "@taiga-ui/core";
import {TuiIconModule} from '@taiga-ui/experimental';
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";



@NgModule({
  imports: [
    TuiIconModule,
    TuiSvgModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    }
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule {}
