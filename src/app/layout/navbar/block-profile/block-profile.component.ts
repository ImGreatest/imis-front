import { ChangeDetectionStrategy, Component, Input } from '@angular/core';



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
