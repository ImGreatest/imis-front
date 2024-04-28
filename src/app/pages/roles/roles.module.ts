import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiLoaderModule,
  TuiRootModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './roles.component';
import { TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  imports: [
    CommonModule,
    TuiInputModule,
    TuiPaginationModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiTableModule,
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
