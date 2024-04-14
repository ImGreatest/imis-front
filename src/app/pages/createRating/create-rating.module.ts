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
import { CreateRatingComponent } from './create-rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { TagsTreeModule } from './tags-tree/tags-tree.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TuiInputNumberModule,
    TuiInputModule,
    TagsTreeModule,
    TuiButtonModule,
    TuiIslandModule,
    FormsModule,
    TuiRootModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateRatingComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer,
    },
  ],
  declarations: [CreateRatingComponent],
  exports: [CreateRatingComponent],
})
export class CreateRatingModule {}
