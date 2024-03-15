import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {TuiAppearance} from "@taiga-ui/core";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.less',
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
export class OverviewComponent {
  protected statusSideBar: boolean = false;
  protected notifications = false;

  openSideBar(): void {
    this.statusSideBar = true;
  }

  closeSideBar(active?: boolean): void {
    if (active === undefined || !active) {
      this.statusSideBar = false;
    }
  }

  openNotifications() {
    this.notifications = true
  }

  closeNotifications() {
    this.notifications = false
  }

}
