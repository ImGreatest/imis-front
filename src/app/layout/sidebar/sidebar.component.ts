import { ChangeDetectionStrategy, Component, Output, ViewEncapsulation } from '@angular/core';
import {TuiAppearance} from "@taiga-ui/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.less',
  providers: [
    {
      provide: 'TUI_BUTTON_OPTIONS',
      useValue: {
        shape: 'rounded',
        appearance: TuiAppearance.Outline,
        size: 'm',
      }
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected barProfile: boolean = false;
  @Output()
  statusNotice: boolean = false;
  @Output()
  readonly buttonContent = [
    {title: 'Главная', routing: '/', icon: 'tuiIconHome', selected: true},
    {title: 'Рейтинг', routing: '/rating', icon: 'tuiIconBarChartLarge', selected: false},
    {title: 'Проекты', routing: '/projects', icon: 'tuiIconBookLarge', selected: false},
    {title: 'События', routing: '/events', icon: 'tuiIconCalendarLarge', selected: false},
    {title: 'Компании', routing: '/company', icon: 'tuiIconBriefcaseLarge', selected: false},
    {title: 'Мат. Модель', routing: 'math-models', icon: 'tuiIconSlackLarge', selected: false},
    {title: 'Роли', routing: 'roles', icon: 'tuiIconUsersLarge', selected: false},
    {title: 'Умения', routing: 'skills', icon: 'tuiIconGitPullRequestLarge', selected: false},
  ]
  @Output()
  readonly buttonHeader = [
    {title: 'Настройки', routing: '/auth', icon: 'tuiIconSettingsLarge', onHover: false}
  ]
  @Output()
  noticeList = [
    {date: "13 марта 2024", content: [{title: "Внимание", text: "Ваш проект отслеживается - 15 пользователями"}, {title: "Внимание2", text: "Ваш проект отслеживается - 15 пользователями"}]},
    {date: "12 марта 2024", content: [{title: "Важная новость", text: "Ваш проект отслеживается - 151 пользователями"}]},
  ]

  constructor(private router: Router) {}
}
