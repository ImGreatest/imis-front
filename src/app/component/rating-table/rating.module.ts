import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { RatingTableComponent } from './rating.component';
import {
  TuiInputModule,
  TuiInputRangeModule,
  TuiPaginationModule,
  TuiSelectModule,
  TuiTagModule,
} from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { TuiIconModule } from '@taiga-ui/experimental';
import { ReactiveFormsModule } from '@angular/forms';
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";

@NgModule({
  imports: [
    CommonModule,
    TuiIconModule,
    TuiLoaderModule,
    TuiInputRangeModule,
    TuiActiveZoneModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiModeModule,
    TuiSelectModule,
    TuiTableModule,
    TuiTagModule,
    TuiButtonModule,
    ReactiveFormsModule,
    TuiLinkModule,
    NgIf,
    TuiLetModule,
    TuiPaginationModule,
  ],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
  ],
  declarations: [RatingTableComponent],
  exports: [RatingTableComponent],
})
export class RatingTableModule {}
