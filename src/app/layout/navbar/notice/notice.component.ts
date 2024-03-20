import {ChangeDetectionStrategy, Component, Input} from '@angular/core';



@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticeComponent {
  @Input()
  statusNotice: boolean = false;
  @Input()
  noticeList!: {date: string; content: {title: string, text: string}[]}[];

  constructor() {
  }

  closeNotice() {
    this.statusNotice = false;
  }
}
