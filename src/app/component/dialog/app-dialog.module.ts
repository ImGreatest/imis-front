import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

import { APP_DIALOG_PROVIDER } from './app-dialog.service';
import { AppDialogComponent } from './app-dialog.component';

@NgModule({
  imports: [TuiButtonModule, PolymorpheusModule, CommonModule, TuiSvgModule],
  providers: [APP_DIALOG_PROVIDER],
  declarations: [AppDialogComponent],
  exports: [AppDialogComponent],
})
export class AppDialogModule {}
