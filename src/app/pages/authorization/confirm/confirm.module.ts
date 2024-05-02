import { NgModule } from "@angular/core";
import { ConfirmComponent } from "src/app/pages/authorization/confirm/confirm.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  TuiInputDateRangeModule,
  TuiInputModule, TuiInputPasswordModule
} from "@taiga-ui/kit";
import { TuiErrorModule } from "@taiga-ui/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ConfirmComponent }
    ]),
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiCardModule,
    TuiCheckboxLabeledModule,
    TuiChipModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiSurfaceModule,
    TuiTooltipModule,
  ],
  declarations: [ConfirmComponent],
  exports: [ConfirmComponent],
})
export class ConfirmModule {}
