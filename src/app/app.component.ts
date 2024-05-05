import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiThemeNightService } from "@taiga-ui/addon-doc";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(@Inject(TuiThemeNightService) readonly night: TuiThemeNightService) {}
}
