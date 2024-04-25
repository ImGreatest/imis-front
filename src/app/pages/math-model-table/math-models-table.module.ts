import { NgModule } from '@angular/core';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { CommonModule } from '@angular/common';
import { MathModelsTableComponent } from './math-models-table.component';
import { RouterModule } from '@angular/router';
import { TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule.forChild([{ path: '', component: MathModelsTableComponent }]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  declarations: [MathModelsTableComponent],
  exports: [MathModelsTableComponent],
})
export class MathModelsTableModule {}
