import {NgModule} from "@angular/core";
import {
  TUI_SANITIZER,
} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CommonModule} from "@angular/common";
import {EventsComponent} from "./events.component";



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
  declarations: [EventsComponent],
  exports: [EventsComponent],
})
export class EventsModule {}
