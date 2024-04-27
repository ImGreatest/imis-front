import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "./auth.component";
import { TuiButtonModule, TuiCardModule, TuiTitleModule } from "@taiga-ui/experimental";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: AuthComponent }
		]),
		TuiCardModule,
		TuiButtonModule,
		TuiTitleModule,
		FormsModule,
		ReactiveFormsModule,
	],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
