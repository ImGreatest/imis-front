import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { emailValidators } from "@validators";
import { IAuthForm } from "./interfaces/auth-form.interface";
import { firstValueFrom } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

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
    private route: Router,
    private authService: AuthService
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
    console.log(this.form.valid);
    console.log(this.authService.isAuthenticated());
    if (this.form.valid) {
      console.log(this.login, this.password);
      this._login(this.login, this.password).then(r => console.log(r));
    }
  }

  private async _login(email: string, password: string) {
    const result = await firstValueFrom(this.authService.signIn({
      email: email,
      password: password
    }));
    console.log(result);
    this.authService.setToken(result);
    await this.route.navigate(['/']);
  }
}
