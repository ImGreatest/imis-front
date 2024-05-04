import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { passwordValidators } from "@validators";
import { Router } from "@angular/router";
import { INewPasswordForm } from "src/app/pages/authorisation/new-password/interfaces/new-password.interface";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.less'
})
export class NewPasswordComponent {
  readonly form: FormGroup<INewPasswordForm> = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: passwordValidators,
    }),
    retryPassword: new FormControl('', {
      nonNullable: true,
      validators: passwordValidators,
    }),
  });

  constructor(
    private route: Router,

  ) {}

  get password() {
    return this.form.controls.password.value;
  }

  get retryPassword() {
    return this.form.controls.retryPassword.value;
  }
}
