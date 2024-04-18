import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiRootModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './roles.component';

@NgModule({
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiRootModule,
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  declarations: [RolesComponent],
  exports: [RolesComponent],
})
export class RolesModule {}
