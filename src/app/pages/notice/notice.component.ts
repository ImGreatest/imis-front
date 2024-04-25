import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeComponent {}
