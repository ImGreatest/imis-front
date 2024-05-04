import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {

}
