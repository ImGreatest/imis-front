import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  TuiAvatarOutlineModule,
  TuiBadgedContentModule, TuiBadgeModule,
  TuiBadgeNotificationModule, TuiButtonModule, TuiIconModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TuiActionModule, TuiAvatarModule, TuiMarkerIconModule, TuiTagModule } from "@taiga-ui/kit";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    TuiTitleModule,
    TuiAvatarModule,
    TuiAvatarOutlineModule,
    TuiBadgedContentModule,
    TuiBadgeNotificationModule,
    TuiIconModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiTagModule,
    TuiActionModule,
    TuiMarkerIconModule,
    RouterOutlet,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.less',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  selectPhoto: boolean = false;
}
