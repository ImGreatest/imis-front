import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TuiAppearance, TuiDurationOptions, tuiScaleIn} from "@taiga-ui/core";
import {EMonthRedact} from "../../common/enum/datas-date";
import {tuiPure} from "@taiga-ui/cdk";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
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
export class NavbarComponent {
  protected statusSideBar: boolean = false;
  protected statusNotice: boolean = false;
  protected barNav: boolean = false
  protected barProfile: boolean = false;
  protected isHoveredBell: boolean = false;

  convertDate(date: Date): string {
    const month: { [key: string]: EMonthRedact } = EMonthRedact;
    return `${date.getDay()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  }

  readonly todoTasks = [
    {title: 'Install Angular', completed: true},
    {title: 'Install Taiga UI', completed: false},
    {title: 'Look into "Getting Started"', completed: false},
  ];

  readonly buttonList = [
    {title: 'Главная', routing: '/', icon: 'tuiIconHome', onHover: false},
    {title: 'Рейтинг', routing: '/rating', icon: 'tuiIconBarChartLarge', onHover: false},
    {title: 'Проекты', routing: '/projects', icon: 'tuiIconBookLarge', onHover: false},
    {title: 'События', routing: '/events', icon: 'tuiIconCalendarLarge', onHover: false},
    {title: 'Компании', routing: '/company', icon: 'tuiIconBriefcaseLarge', onHover: false}
  ]

  @tuiPure
  getAnimation(duration: number): TuiDurationOptions {
    return {value: '', params: {duration}};
  }

  showNavBar(): void {
    this.barNav = true;
  }

  closeNavBar(): void {
    this.barNav = false;
  }

  showProfileBar(): void {
    this.barProfile = !this.barProfile;
  }

  closeProfileBar(): void {
    this.barProfile = false;
  }

  openSideBar(): void {
    this.statusSideBar = true;
  }

  closeSideBar(active?: boolean): void {
    if (active === undefined || !active) {
      setTimeout(() => {
        this.statusSideBar = false;
      }, 25 / 2)
    }
  }

  openNotice(): void {
    this.statusNotice = !this.statusNotice;
  }

  closeNotice(active?: boolean): void {
    console.log(active)
    if (active === undefined || !active) {
      this.statusNotice = false;
    }
  }
}
