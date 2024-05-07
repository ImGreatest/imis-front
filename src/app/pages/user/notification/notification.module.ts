import { NgModule } from "@angular/core";
import { NotificationComponent } from "./notification.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiTitleModule } from "@taiga-ui/experimental";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: NotificationComponent }
		]),
		TuiTitleModule,
	],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class NotificationModule {}
