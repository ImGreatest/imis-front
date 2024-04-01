import { ChangeDetectionStrategy, Component, Input } from '@angular/core';



@Component({
  selector: 'block-header',
  templateUrl: './block-header.component.html',
  styleUrl: './block-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockHeaderComponent {
  @Input()
  statusSideBar: boolean = false;
  @Input()
  statusTheme: boolean = false;
}
