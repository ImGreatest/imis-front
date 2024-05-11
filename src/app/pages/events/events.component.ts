import {ChangeDetectionStrategy, Component} from '@angular/core';
import {tuiFadeIn} from "@taiga-ui/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiFadeIn],
})
export class EventsComponent {}
