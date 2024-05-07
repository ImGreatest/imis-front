import { NgModule } from "@angular/core";
import { RecoverComponent } from "src/app/pages/authorisation/recover/recover.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  TuiButtonModule,
  TuiCardModule,
  TuiChipModule,
  TuiSurfaceModule,
  TuiTooltipModule
} from "@taiga-ui/experimental";
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule
} from "@taiga-ui/kit";
import { TuiAlertModule, TuiErrorModule, TuiPrimitiveTextfieldModule } from "@taiga-ui/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: RecoverComponent }
		]),
		TuiButtonModule,
		TuiCardModule,
		TuiCheckboxLabeledModule,
		TuiChipModule,
		TuiErrorModule,
		TuiFieldErrorPipeModule,
		TuiInputModule,
		TuiInputPasswordModule,
		TuiPrimitiveTextfieldModule,
		TuiSurfaceModule,
		ReactiveFormsModule,
		TuiTooltipModule,
		TuiAlertModule
	],
  declarations: [RecoverComponent],
  exports: [RecoverComponent],
})
export class RecoverModule {}
