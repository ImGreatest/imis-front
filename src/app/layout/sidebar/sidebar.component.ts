import {ChangeDetectionStrategy, Component, Output, ViewEncapsulation} from '@angular/core';
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
  animations: [tuiScaleIn],
})
export class SidebarComponent {
  protected barNav: boolean = false
  protected barBell: boolean = false;
  protected barProfile: boolean = false;

  @Output()
  statusSideBar: boolean = false;
  @Output()
  statusNotice: boolean = false;
  @Output()
  readonly buttonList = [
    {title: 'Главная', routing: '/', icon: 'tuiIconHome', onHover: false},
    {title: 'Рейтинг', routing: '/rating', icon: 'tuiIconBarChartLarge', onHover: false},
    {title: 'Проекты', routing: '/projects', icon: 'tuiIconBookLarge', onHover: false},
    {title: 'События', routing: '/events', icon: 'tuiIconCalendarLarge', onHover: false},
    {title: 'Компании', routing: '/company', icon: 'tuiIconBriefcaseLarge', onHover: false}
  ]
  @Output()
  noticeList = [
    {date: "13 марта 2024", content: [{title: "Внимание", text: "Ваш проект отслеживается - 15 пользователями"}, {title: "Внимание2", text: "Ваш проект отслеживается - 15 пользователями"}]},
    {date: "12 марта 2024", content: [{title: "Важная новость", text: "Ваш проект отслеживается - 151 пользователями"}]},
  ]
  protected isHoveredBell: boolean = false;

  constructor(private router: Router) {}

  convertDate(date: Date): string {
    const month: { [key: string]: EMonthRedact } = EMonthRedact;
    return `${date.getDay()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  }

  sidebarToggle(): void {
    this.statusSideBar = !this.statusSideBar;
  }

  openNotice(): void {
    this.statusNotice = !this.statusNotice;
  }

  closeNotice(active?: boolean): void {
    if (active === undefined || !active) {
      this.statusNotice = false;
    }
  }
  showNavBar(): void {
    this.barNav = true;
  }

  closeNavBar(): void {
    this.barNav = false;
  }

  showBellBar(): void {
    this.barBell = true;
  }

  closeBellBar(): void {
    this.barBell = false;
  }

  showProfileBar(): void {
    this.barProfile = !this.barProfile;
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


  openSideBar(): void {
    this.statusSideBar = true;
  }

  closeSideBar(active?: boolean): void {
    if (active === undefined || !active) {
      this.statusSideBar = false;
    }
  }

}
