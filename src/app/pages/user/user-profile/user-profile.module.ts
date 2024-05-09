import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {UserProfileComponent} from "./user-profile.component";
import { TuiTitleModule } from "@taiga-ui/experimental";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: UserProfileComponent },
		]),
		TuiTitleModule,
	],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
})
export class UserProfileModule {}
