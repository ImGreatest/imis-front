import { Component, Inject, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IResetForm } from "src/app/pages/authorisation/recover/interfaces/reset-form.interface";
import { emailValidators } from "@validators";
import { Router } from "@angular/router";
import { EmailService } from "@services";
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusComponent } from "@tinkoff/ng-polymorpheus";
import { ConfirmComponent } from "src/app/pages/authorisation/confirm/confirm.component";
import { IReqMessageHtml } from "@interfaces";
import { tuiIconBell } from "@taiga-ui/icons";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.less'
})
export class RecoverComponent {
  protected showAlert: boolean = false;
  readonly form: FormGroup<IResetForm> = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, emailValidators]
    })
  });

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private route: Router,
    private emailService: EmailService,
  ) {}

  get login() {
    return this.form.controls.login.value;
  }

  async onReset() {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());

    const messageHtml: IReqMessageHtml = {
      to: this.login,
      subject: "Обновление пароля"
    }

    await this.emailService.confirmAction(messageHtml).subscribe((v) => {
      this.showAlert = true;
      this.showDialog(v.access);
    });
  }

  async onCancel(): Promise<void> {
    this.form.reset();
    await this.route.navigate(['/auth']);
  }

  showDialog(code: number) {
    const dialog = this.dialogs.open<number>(
      new PolymorpheusComponent(ConfirmComponent, this.injector),
      {
        data: {
          email: this.login,
          code: code,
        },
        dismissible: true,
        label: "Confirm action"
      },
    )
    dialog.subscribe({
      next: data => {
        console.info('Dialog emitted data');
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

  protected readonly tuiIconBell = tuiIconBell;
}
