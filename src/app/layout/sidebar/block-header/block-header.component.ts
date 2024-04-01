import {ChangeDetectionStrategy, Component, Inject, Input} from '@angular/core';
import {TuiThemeNightService} from "@taiga-ui/addon-doc";
import {TuiBrightness} from "@taiga-ui/core";



@Component({
  selector: 'block-header',
  templateUrl: './block-header.component.html',
  styleUrl: './block-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockHeaderComponent {
  @Input()
  statusSideBar: boolean = false;

  constructor(@Inject(TuiThemeNightService) readonly night: TuiThemeNightService) {}
}
