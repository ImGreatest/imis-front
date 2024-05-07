import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthComponent} from "src/app/pages/authorisation/auth/auth.component";
import {
	TuiButtonModule,
	TuiCardModule,
	TuiSurfaceModule,
	TuiTitleModule,
	TuiTooltipModule
} from "@taiga-ui/experimental";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule
} from "@taiga-ui/kit";
import { TuiDialogModule, TuiErrorModule } from "@taiga-ui/core";

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
		TuiInputModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputPasswordModule,
		TuiCheckboxLabeledModule,
		TuiSurfaceModule,
		TuiTooltipModule,
    TuiDialogModule,
	],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
