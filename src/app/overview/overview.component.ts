import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {}
