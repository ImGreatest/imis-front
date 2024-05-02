import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDataListModule,
  TuiRootModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { RouterModule } from '@angular/router';
import { CreateRatingComponent } from './create-rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { TagsTreeModule } from './tags-tree/tags-tree.module';
import { CreateTagComponent } from './create-tag-modal/create-tag.component';
import { CreateTagModule } from './create-tag-modal/create-tag.module';

@NgModule({
  imports: [
    TagsTreeModule,
    CommonModule,
    FormsModule,
    TuiInputNumberModule,
    TuiInputModule,
    TuiButtonModule,
    TuiIslandModule,
    FormsModule,
    CreateTagModule,
    TuiRootModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
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
