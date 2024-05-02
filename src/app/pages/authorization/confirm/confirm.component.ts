import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IConfirmForm } from "src/app/pages/authorization/confirm/interfaces/confirm-form.interface";
import { passwordValidators } from "@validators";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less'
})
export class ConfirmComponent {
  readonly form: FormGroup<IConfirmForm> = new FormGroup({
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

  onConfirm() {
    this.form.markAllAsTouched();
  }

  private async _confirm() {
    await this.route.navigate(['/auth']);
  }
}
