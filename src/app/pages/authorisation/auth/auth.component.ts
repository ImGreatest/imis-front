import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { emailValidators, passwordValidators } from "@validators";
import { IAuthForm } from "src/app/pages/authorisation/auth/interfaces/auth-form.interface";
import { debounceTime, firstValueFrom, map, Observable, share } from 'rxjs';
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less'
})
export class AuthComponent  {
  readonly form: FormGroup<IAuthForm> = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, emailValidators]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    remind: new FormControl(false)
  });

  password$: Observable<string> = this.form.controls.password.valueChanges.pipe(
    map(password => password.length > 3 ? password : ''),
    debounceTime(750),
    share()
  )

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

  hasUpperCase(word: string): boolean {
    return /[A-Z]/.test(word);
  }

  hasNumCase(word: string): boolean {
    return /[0-9]/.test(word);
  }

  hasSpecChar(word: string): boolean {
    return /[^a-zA-Z0-9]/.test(word);
  }

  onLogin(): void {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());
    if (this.form.valid) {
      this._login(this.login, this.password).then(r => r);
    }
  }

  async onForgotPassword(): Promise<void> {
    await this.route.navigate(['/auth/reset']);
  }

  private async _login(email: string, password: string): Promise<void> {
    await firstValueFrom(this.authService.signIn({
      email: email,
      password: password
    }));
    await this.route.navigate(['/overview']);
  }
}
