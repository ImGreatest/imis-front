import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewPasswordComponent } from "src/app/pages/authorisation/new-password/new-password.component";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiCardModule, TuiSurfaceModule, TuiTooltipModule } from "@taiga-ui/experimental";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiFieldErrorPipeModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { TuiErrorModule } from "@taiga-ui/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NewPasswordComponent }
    ]),
    TuiTooltipModule,
    ReactiveFormsModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiInputPasswordModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
  ],
  declarations: [NewPasswordComponent],
  exports: [NewPasswordComponent],
})
export class NewPasswordModule {}
