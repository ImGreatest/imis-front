import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiThemeNightService} from "@taiga-ui/addon-doc";
import {TuiBrightness} from "@taiga-ui/core";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
