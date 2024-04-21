import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './math-models-table.component.html',
  styleUrl: './math-models-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class MathModelsTableComponent {
  readonly columns = [
    'place',
    'name',
    'surname',
    'group',
    'ratingScore',
    'actions'
];
readonly direction$ = new BehaviorSubject < -1 | 1 > (-1);
readonly sorter$ = new BehaviorSubject < string > ('ratingScore');
}
