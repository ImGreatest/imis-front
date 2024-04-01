import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {TuiThemeNightService} from "@taiga-ui/addon-doc";
import {TuiBrightness} from "@taiga-ui/core";



@Component({
  selector: 'block-profile',
  templateUrl: './block-profile.component.html',
  styleUrl: './block-profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockProfileComponent {
  @Input()
  statusSideBar: boolean = false;
}
