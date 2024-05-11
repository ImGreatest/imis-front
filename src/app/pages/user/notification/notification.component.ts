import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationService } from "@services";
import {
  TuiAvatarModule,
  TuiButtonModule,
  TuiCellModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TuiScrollbarModule } from "@taiga-ui/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TuiTitleModule,
    TuiScrollbarModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiSurfaceModule,
    TuiCellModule,
  ],
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
