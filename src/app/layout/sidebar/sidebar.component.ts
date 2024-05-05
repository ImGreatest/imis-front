import { ChangeDetectionStrategy, Component, Output, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { IButtonContent } from "./interfaces/button-content.interface";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.less',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Output()
  buttonContent: IButtonContent[] = [
    {title: 'Главная', routing: '/overview', icon: 'tuiIconHome', selected: this.router.url === '/overview'},
    {title: 'Рейтинг', routing: '/rating', icon: 'tuiIconBarChartLarge', selected: this.router.url === '/rating'},
    {title: 'Проекты', routing: '/projects', icon: 'tuiIconBookLarge', selected: this.router.url === '/projects'},
    {title: 'События', routing: '/events', icon: 'tuiIconCalendarLarge', selected: this.router.url === '/events'},
    {title: 'Компании', routing: '/company', icon: 'tuiIconBriefcaseLarge', selected: this.router.url === '/company'},
    {title: 'Мат. Модель', routing: '/math-models', icon: 'tuiIconSlackLarge', selected: this.router.url === '/math-models'},
    {title: 'Роли', routing: '/roles', icon: 'tuiIconUsersLarge', selected: this.router.url === '/roles'},
    {title: 'Умения', routing: '/skills', icon: 'tuiIconGitPullRequestLarge', selected: this.router.url === '/skills'},
    {title: 'Успехи', routing: '/success', icon: 'tuiIconTrendingUpLarge', selected: this.router.url === '/success'},
  ]

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onPopState();
      }
    });
  }

  onPopState(): void {
    this.buttonContent = this.buttonContent.map(button => {
      button.selected = this.router.url === button.routing;
      return button;
    })
  }
}
