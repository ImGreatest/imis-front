import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IResetEmailForm } from "./interfaces/reset-email.interface";
import { emailValidators } from "@validators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-change-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.less'
})
export class ChangeEmailComponent {
  readonly form: FormGroup<IResetEmailForm> = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, emailValidators]
    })
  });

  constructor(private router: Router) {}

  get email() {
    return this.form.controls.email.value;
  }
}
