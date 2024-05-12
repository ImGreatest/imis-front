import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { IResNoticeDto } from "@interfaces";

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
export class NotificationComponent implements OnInit {
  notificationList: IResNoticeDto[] = [];
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getBySender(1).subscribe((v: IResNoticeDto[]) => {
      this.notificationList.push(...v);
    });
    console.log(this.notificationList, this.checkOnUnRead());
  }

  checkOnUnRead(): IResNoticeDto[] {
    return this.notificationList.filter((v: IResNoticeDto) => v.status === 'unread');
  }

  async onDelete(): Promise<void> {
    this.notificationService.getCurrent(7).subscribe(v => console.log(v));
  }
}
