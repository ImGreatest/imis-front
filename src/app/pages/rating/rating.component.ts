import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IUser } from './interface/user';
import { RatingService } from '../../common/services/api/rating.service';
import { IStudentScore } from '../../common/interfaces/rating/student.score';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  share,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { PageRes } from '../../common/interfaces/page';
import { tuiIsFalsy } from '@taiga-ui/cdk';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
}
