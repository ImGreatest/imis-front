import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { emailValidators } from "../../common/validators/email.validators";
import { IAuthForm } from "../auth/interfaces/auth-form.interface";
import { firstValueFrom } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less'
})
export class AuthComponent {
  readonly form: FormGroup<IAuthForm> = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, emailValidators]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    remind: new FormControl(false)
  });

  constructor(
    private route: Router
  ) {}

  get login() {
    return this.form.controls.login.value;
  }

  get password() {
    return this.form.controls.password.value;
  }

  get remind() {
    return this.form.controls.remind.value;
  }

  onLogin() {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());

    if (this.form.valid) {
      console.log(this.login, this.password);
      this._login(this.login, this.password);
    }
  }

  private async _login(login: string, password: string) {
    // await firstValueFrom(); // ToDo: authService from back
    await this.route.navigate(['/']);
  }
}
