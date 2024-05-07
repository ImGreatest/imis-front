import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'block-notice',
  templateUrl: './block-notice.component.html',
  styleUrl: './block-notice.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockNoticeComponent {
  select: boolean = false;
  constructor(
    private readonly route: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.select = this.route.url === '/user/notifications';
        this.cdr.markForCheck();
      }
    });
  }

  async onClick(): Promise<void> {
    this.select = !this.select;
    await this.route.navigate(['user/notifications']);
    this.cdr.markForCheck();
  }
}
