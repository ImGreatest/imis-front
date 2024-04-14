import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
}
