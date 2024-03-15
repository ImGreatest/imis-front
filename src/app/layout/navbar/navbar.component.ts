import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TuiAppearance} from "@taiga-ui/core";
import {EMonthRedact} from "../../common/enum/datas-date";



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
})
export class NavbarComponent {
  protected statusSideBar: boolean = false;

  convertDate(date: Date): string {
    const month: { [key: string]: EMonthRedact } = EMonthRedact;
    return `${date.getDay()} ${month[date.getMonth()]} ${date.getFullYear()}`;
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
