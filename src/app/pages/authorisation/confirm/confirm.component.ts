import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext, TuiErrorModule, TuiHintModule } from "@taiga-ui/core";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IConfirmForm } from "src/app/pages/authorisation/confirm/interfaces/confirm.interface";
import { MaskitoOptions } from '@maskito/core';
import { Router } from "@angular/router";
import { TuiFieldErrorPipeModule, TuiInputModule } from "@taiga-ui/kit";
import { TuiButtonModule, TuiCardModule } from "@taiga-ui/experimental";
import { AsyncPipe, CommonModule } from "@angular/common";
import { MaskitoModule } from "@maskito/angular";
import { IContextData } from "src/app/pages/authorisation/confirm/interfaces/context-data.interface";

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiCardModule,
    TuiHintModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiButtonModule,
    MaskitoModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
  readonly form: FormGroup<IConfirmForm> = new FormGroup({
    code: new FormControl('',{
      nonNullable: true,
    }),
  });
  readonly maskCode: MaskitoOptions = {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
    ]
  }

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<string, IContextData>,
    private readonly route: Router,
  ) {}

  get code(): string {
    return this.form.controls.code.value;
  }

  get email(): string {
    return this.context.data.email;
  }

  get emailCode(): string {
    return this.context.data.code;
  }

  async onConfirm() {
    this.form.markAllAsTouched();
    Object.values(this.form.controls).map((control) => control.updateValueAndValidity());
    await this._confirm();
  }

  private async _confirm() {
    if (this.emailCode.toString() === this.unmask(this.code)) {
      await this.route.navigate(['/auth/new-password']);
    }
  }

  readonly unmask = (value: string): string => value.replace(/-/g, '');
}
