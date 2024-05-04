import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'block-notice',
  templateUrl: './block-notice.component.html',
  styleUrl: './block-notice.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockNoticeComponent {
  constructor(private readonly route: Router) {}

  async onClick(): Promise<void> {
    await this.route.navigate(['/notifications'])
  }
}
