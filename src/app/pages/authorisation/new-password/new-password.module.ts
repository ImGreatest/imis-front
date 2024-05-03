import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewPasswordComponent } from "src/app/pages/authorisation/new-password/new-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import {
  TuiButtonModule,
  TuiCardModule,
  TuiIconsModule,
  TuiSurfaceModule,
  TuiTooltipModule
} from "@taiga-ui/experimental";
import { TuiErrorModule } from "@taiga-ui/core";
import { TuiFieldErrorPipeModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NewPasswordModule }
    ]),
    ReactiveFormsModule,
    TuiButtonModule,
    TuiCardModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiIconsModule,
    TuiInputPasswordModule,
    TuiSurfaceModule,
    TuiTooltipModule,
  ],
  declarations: [NewPasswordComponent],
  exports: [NewPasswordComponent],
})
export class NewPasswordModule {}
