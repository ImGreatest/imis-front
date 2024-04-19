import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class EventsComponent {}
