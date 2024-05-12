import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import {
  TuiAvatarOutlineModule,
  TuiBadgedContentModule, TuiBadgeModule,
  TuiBadgeNotificationModule, TuiButtonModule, TuiIconModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import { TuiActionModule, TuiAvatarModule, TuiMarkerIconModule, TuiTagModule } from "@taiga-ui/kit";
import { Router, RouterOutlet } from "@angular/router";

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

  constructor(
    private router: Router
  ) {}

  onChangeEmail(): void {
    this.router.navigate(['/user/profile/change-email']).then((r) => '');
  }

  onChangePassword(): void {
    this.router.navigate(['/user/profile/change-password']).then((r) => '');
  }
}
