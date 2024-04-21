import { NgModule } from '@angular/core';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { CommonModule } from '@angular/common';
import { MathModelsTableComponent } from './math-models-table.component';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from '../projects/projects.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';

@NgModule({
  imports: [
    CommonModule,
    TuiInputModule,
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
