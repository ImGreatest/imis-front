import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {NotificationsComponent} from "./notifications.component";
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: NotificationsComponent}
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
