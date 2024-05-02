import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IResetForm } from "src/app/pages/authorization/recover/interfaces/reset-form.interface";
import { emailValidators } from "@validators";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "@services";


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.less'
})
export class RecoverComponent {
  readonly form: FormGroup<IResetForm> = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, emailValidators]
    })
  });

  constructor(
    private route: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  get login() {
    return this.form.controls.login.value;
  }

  onReset(): void {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());
    if (this.form.valid) {
      console.log('valid');
      this._reset(this.login).then(r => console.log(r));
    }
  }

  async onCancel(): Promise<void> {
    await this.route.navigate(['/auth']);
  }

  private async _reset(email: string): Promise<void> {
    // await firstValueFrom(this.authService.reset({
    //   email: email
    // }));
    await this.route.navigate(['/auth/confirm'])
  }
}
