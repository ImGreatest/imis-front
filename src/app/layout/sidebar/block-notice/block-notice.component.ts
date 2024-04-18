import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'block-notice',
  templateUrl: './block-notice.component.html',
  styleUrl: './block-notice.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockNoticeComponent {}
