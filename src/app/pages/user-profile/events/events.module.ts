import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {RouterModule} from "@angular/router";
import { EventsComponent } from "./events.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'user', component: EventsComponent}
    ]),
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
