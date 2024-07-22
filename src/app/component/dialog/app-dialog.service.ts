import { Injectable, Provider } from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AppDialogComponent } from './app-dialog.component';
import { AppDialogOptions } from './app-dialog.options';
import { AbstractTuiDialogService, TUI_DIALOGS } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root',
})
export class AppDialogService extends AbstractTuiDialogService<AppDialogOptions, any> {
  readonly defaultOptions = {} as const;

  readonly component = new PolymorpheusComponent(AppDialogComponent);
}

export const APP_DIALOG_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: AppDialogService,
  multi: true,
};
