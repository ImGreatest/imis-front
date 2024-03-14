import {ChangeDetectionStrategy, Component, Inject, Injector, ViewEncapsulation} from '@angular/core';
import {TuiAppearance, TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'



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
  protected editMode: boolean = false;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    ) {
  }

  openSideBar(): void {
    this.statusSideBar = true;
  }

  closeSideBar(active: boolean) {
    if (!active) {
      this.statusSideBar = false;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }
}
