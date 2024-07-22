import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { INavContent } from "@interfaces";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly sections: INavContent[] = [
    { name: 'Главная', routing:'/overview', select: false },
    { name:'Рейтинг', routing: '/rating', select: false },
    { name:'Проекты', routing: '/projects', select: false },
    { name:'События', routing: '/events', select: false },
    { name:'Компании', routing: '/company', select: false }
  ];

  constructor(
    protected router: Router,
    private authService: AuthService
  ) {}

  onProfile(): void {
    this.router.navigate(['/user/profile']).then(r => '');
  }

  onFavorite(): void {
    this.router.navigate(['/user/favorite']).then(r => '');
  }

  onProject(): void {
    this.router.navigate(['/user/projects']).then(r => '');
  }

  onEvent(): void {
    this.router.navigate(['/user/events']).then(r => '');
  }

  onNotice(): void {
    this.router.navigate(['/user/notifications']).then(r => '');
  }

  async onLogout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['auth']);
  }
}
