import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { passwordValidators } from "@validators";
import { Router } from "@angular/router";
import { IResetPasswordForm } from "./interfaces/reset-password.interface";
import { TuiButtonModule, TuiTooltipModule } from "@taiga-ui/experimental";
import { TuiFieldErrorPipeModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { TuiErrorModule } from "@taiga-ui/core";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiTooltipModule, TuiInputPasswordModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.less'
})
export class ChangePasswordComponent {
  readonly form: FormGroup<IResetPasswordForm> = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: passwordValidators
    }),
  });

  constructor(private router: Router) {}

  get password() {
    return this.form.controls.password.value;
  }
}
