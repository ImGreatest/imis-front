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
  expandDropdown: boolean = false;
  readonly sections: INavContent[] = [
    { name: 'Главная', routing:'/overview', select: false },
    { name: 'Рейтинг', routing: '/rating', select: false },
    { name: 'Проекты', routing: '/projects', select: false },
    { name: 'События', routing: '/events', select: false },
    { name: 'Компании', routing: '/company', select: false }
  ];

  constructor(
    protected router: Router,
    private authService: AuthService
  ) {}

  onProfile(): void {
    this.router.navigate(['/user/profile']).then(r => '');
  }

  onFavorite(): void {
    this.expandDropdown = true;
  }

  onFavoriteProjects(): void {
    this.router.navigate(['/user/favorite/projects']).then(r => '');
    this.expandDropdown = false;
  }

  async onFavoriteEvents(): Promise<void> {
    this.router.navigate(['/user/favorite/events']).then(() => '');
    this.expandDropdown = false;
  }

  onFavoriteUsers(): void {
    this.router.navigate(['/user/favorite/users']).then(() => '');
    this.expandDropdown = false;
  }

  onFavoriteCompanies(): void {
    this.router.navigate(['/user/favorite/companies']).then(() => '');
    this.expandDropdown = false;
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

  onObscured(obscured: boolean): void {
    if (obscured) this.expandDropdown = true;
  }

  onActiveZone(active: boolean): void {
    this.expandDropdown = active && this.expandDropdown;
  }
}
