import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  TuiButtonModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiModeModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { TuiInputModule, TuiPaginationModule, TuiTagModule } from "@taiga-ui/kit";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { TuiLetModule } from "@taiga-ui/cdk";
import { RatingTableModule } from "../../component/rating-table/rating.module";

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiModeModule,
    TuiTableModule,
    TuiTagModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiLetModule,
    TuiPaginationModule,
    RatingTableModule,
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {}
