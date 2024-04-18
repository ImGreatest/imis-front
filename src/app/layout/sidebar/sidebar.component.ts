import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {TuiAppearance, tuiScaleIn} from "@taiga-ui/core";
import {EMonthRedact} from "../../common/enum/datas-date";
import {Router} from "@angular/router";

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
    {title: 'Главная', routing: '/', icon: 'tuiIconHome'},
    {title: 'Рейтинг', routing: '/rating', icon: 'tuiIconBarChartLarge'},
    {title: 'Проекты', routing: '/projects', icon: 'tuiIconBookLarge'},
    {title: 'События', routing: '/events', icon: 'tuiIconCalendarLarge'},
    {title: 'Компании', routing: '/company', icon: 'tuiIconBriefcaseLarge'},
    {title: 'Мат. Модель', routing: 'createRating', icon: 'tuiIconSlackLarge'},
    {title: 'Роли', routing: 'roles', icon: 'tuiIconUsersLarge'},
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

  convertDate(date: Date): string {
    const month: { [key: string]: EMonthRedact } = EMonthRedact;
    return `${date.getDay()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  }

  closeProfileBar(): void {
    this.barProfile = false;
  }

  checkRouterUrl() {
    if (this.router.url !== '/profile') {
      return true
    }
    this.closeProfileBar()
    return false;
  }
}
