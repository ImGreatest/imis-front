import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TUI_SANITIZER, TuiButtonModule } from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TagsTreeComponent } from './tags-tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIconModule } from '@taiga-ui/experimental';

@NgModule({
  imports: [
    CommonModule,
    TuiInputNumberModule,
    FormsModule,
    TuiButtonModule,
    TuiIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  declarations: [TagsTreeComponent],
  exports: [TagsTreeComponent],
})
export class TagsTreeModule {}
