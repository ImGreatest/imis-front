import { NgModule } from "@angular/core";
import { NotificationComponent } from "./notification.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TuiTitleModule } from "@taiga-ui/experimental";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: NotificationComponent }
		]),
		TuiTitleModule,
	],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class NotificationModule {}
