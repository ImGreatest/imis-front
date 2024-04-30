import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiIslandModule,
  TuiSelectModule,
  TuiTreeModule,
} from '@taiga-ui/kit';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIconModule } from '@taiga-ui/experimental';
import { CreateTagComponent } from './create-tag.component';
import { TuiLetModule, TuiPortalModule } from '@taiga-ui/cdk';

@NgModule({
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiPortalModule,
    TuiIslandModule,
    TuiLetModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTreeModule,
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
  declarations: [CreateTagComponent],
  exports: [CreateTagComponent],
})
export class CreateTagModule {}
