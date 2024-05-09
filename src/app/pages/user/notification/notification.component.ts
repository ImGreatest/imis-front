import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from "@services";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  constructor(
    private notificationService: NotificationService,
  ) {}


  async onDelete(): Promise<void> {
    await this.notificationService.getCurrent(7).subscribe(v => console.log(v));
  }
}
